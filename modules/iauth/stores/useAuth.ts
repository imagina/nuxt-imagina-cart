import { defineStore } from 'pinia'
import { Notify } from 'quasar'
import type { LoginResponse } from '~/models/interfaces/auth'
import type { AuthState } from '~/models/interfaces/stores'
import type { UserData, UserSkill } from '~/models/interfaces/user'
import type { ProjectTag } from '~/models/interfaces/projects'
import { User } from '~/models/UserData'

import apiRoutes from '../config/apiRoutes'



const routes = {
  home: '/',
}

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    username: '',
    password: '',
    user: null,
    token: '',
    expiresIn: null,
    loading: false,
    facebookClientId: null,
    googleClientId: null,
    captcha: null,
    settings: null
  }),
  getters: {
    fullUser(state) {
      return state.user ? new User(state.user) : undefined
    },
    userDescription(state) {
      if (!state.user) return ''
      const description = state.user.fields.find(
        (value) => value.name === 'description',
      )
      return description?.value ?? ''
    },
    userSocialMedia(state) {
      if (!state.user || !state.user.socialNetworks.id) return {}
      const socialMedia = JSON.parse(state.user.socialNetworks.value)
      return socialMedia
    },
    getToken(state) {
      if (process.client) {
        return state.token ? state.token : localStorage.getItem('userToken')
      }
      return state.token
    },
    getExpiresIn(state) {
      return state.expiresIn
        ? state.expiresIn
        : Helper.parseStringToDate(localStorage.getItem('expiresIn'))
    },
    getUsername(state) {
      return state.user ? state.user?.email : localStorage.getItem('username')
    },
    getFacebookClientId(state) {
      return state.facebookClientId
    },
    getGoogleClientId(state) {
      return state.googleClientId
    }
  },
  actions: {
    async setToken(token: string, expiresIn: '') {
      this.token = token
      this.expiresIn = Helper.parseStringToDate(expiresIn)
      localStorage.setItem('userToken', token)
      localStorage.setItem('expiresIn', expiresIn)
    },

    async clearToken() {
      this.token = ''
      this.expiresIn = null
      this.user = null
      localStorage.removeItem('userToken')
      localStorage.removeItem('expiresIn')
      localStorage.removeItem('username')
    },

    validateToken() {
      return Helper.timestamp(this.getExpiresIn) >= Helper.timestamp()
    },

    isLogged(){
        return this.user && this.validateToken()
    },

    async redirectTo(path){
      const router = useRouter()
      const route = useRoute()
      if(route.query?.redirectTo){
          const path = await getPath(route.query.redirectTo)
          router.push(path)
      } else {
        Helper.redirectTo(path)
      }
    },

    /* Request login with Social Networks */
    authSocialNetwork(params: {
      socialData: string
      type: string
      token: string
    }) {
      return new Promise((resolve, reject) => {
        const requestUrl = `${apiRoutes.authLoginSocialNetwork}/${params.type}`
        const socialData = params.socialData ? params.socialData : ''
        let requestParams = {
          attributes: {
            token: params.token,
            socialData,
            device: Helper.detectDevice(),
          },
          type: params.type,
        }
        this.token = ''
        apiCluster
          .post(requestUrl, requestParams)
          .then((response: any) => {
            if (response?.data) {
              this.authSuccess(response.data)
              resolve(response.data)
            }
          })
          .catch((error) => {
            console.warn(error)
            reject(error)
          })
      })
    },

    async authSuccess(userData: LoginResponse) {
      this.user = userData.userData
      this.token = userData.userToken
      this.expiresIn = Helper.parseStringToDate(userData.expiresIn)

      localStorage.setItem('userToken', this.token)
      localStorage.setItem('expiresIn', userData.expiresIn)
      localStorage.setItem('username', this.user.email)
      Helper.redirectTo(routes.home)
    },

    async login(credentials: {
      username: string
      password: string
    }): Promise<void> {
      try {
        this.loading = true
        await apiCluster
          .post(apiRoutes.authLogin, credentials)
          .then(async (response: any) => {
            if (response?.data) {
              this.authSuccess(response.data)
              this.redirectTo(routes.home)
            }
          })
      } catch (error: any) {
        console.error('Login failed:', error)
        let msg = 'Algo salio mal en el login'
        if (error.data.errors) msg = 'Usuario o contraseña invalido'

        Notify.create({
          message: msg,
          type: 'negative',
        })
      } finally {
        this.loading = false
      }
    },
    async logout() {
      await apiCluster.get(apiRoutes.authLogout).then((response) => {
        this.clearToken()
      })

      this.redirectTo(apiRoutes.login)


      Notify.create({
        message: 'Has cerrado sesión exitosamente. ¡Hasta pronto!',
        type: 'positive',
      })
    },

    async register(dataForm: {
      firstName: string
      lastName: string
      email: string
      password: string
      agreement: boolean
    }) {
      const currentDate = new Date()
      const credentials = {
        attributes: {
          ...dataForm,
          password_confirmation: dataForm.password,
          timezone: currentDate.getTimezoneOffset() / 60,
          language: navigator.language || (<any>navigator).userLanguage,
        },
      }
      try {
        await apiCluster
          .post(apiRoutes.authRegister, credentials)
          .then((response) => {
            //update store, and redirect
            this.username = dataForm.email
            this.password = dataForm.password

            Helper.redirectTo(apiRoutes.login)
            Notify.create({
              message: '¡Usuario creado! Ahora puedes iniciar sesión.',
              type: 'positive',
            })
          })
      } catch (error: any) {
        console.error('Login failed:', error)
        let msg = 'Algo salio mal en el login'
        if (error.data.errors) msg = 'Correo no disponible'

        Notify.create({
          message: msg,
          type: 'negative',
        })
      }
    },

    /* change the password form admin/changePassword */
    async changePassword(dataForm: {
      password: string
      newPassword: string
      newPasswordConfirmation: string
    }) {
      const requestData = {
        attributes: {
          ...dataForm,
          email: this.getUsername,
        },
      }
      apiCluster
        .post(apiRoutes.changePassword, requestData, {}, false)
        .then((response) => {
          Helper.redirectTo(apiRoutes.login)
          Notify.create({
            message: 'contraseña actualizada!',
            type: 'positive',
          })
        })
        .catch((error) => {
          Notify.create({
            message: 'error al cambiar la contraseña',
            type: 'negative',
          })
        })
    },

    /* reset password request */
    async refreshSession() {
      try {
        if (!this.getToken) return
        const response: any = await apiCluster.get(apiRoutes.authMe)
        this.user = response.data.userData
        this.expiresIn = Helper.parseStringToDate(
          localStorage.getItem('expiresIn'),
        )
        this.token = localStorage.getItem('userToken') ?? ''
      } catch (error) {
        console.error(error)
        this.clearToken()
        return false
      }
    },
    async requestFullUser() {
      try {
        if (!this.getToken) return

        const response: any = await apiCluster.get(
          apiRoutes.profileUsers + `/${this.user?.id}`,
          {
            include: 'information.files,skills',
          },
        )
        this.user = { ...this.user, ...response.data }
      } catch (error) {
        console.error(error)
        throw error
      }
    },
    /* reset password request */
    async resetPassword(dataForm: { username: string }) {
      this.clearToken()
      apiCluster
        .post(apiRoutes.authReset, { attributes: dataForm })
        .then((response) => {
          Helper.redirectTo(apiRoutes.login)
          Notify.create({
            message: 'Revisa tu email para restablecer tu contraseña.',
            type: 'positive',
          })
        })
        .catch((error) => {
          Notify.create({
            message:
              'Ningún usuario con esa dirección de correo electrónico se encuentra registrado en nuestro sistema.',
            type: 'negative',
          })
        })
    },

    /*
      Change password from reset email url
    */
    async changedPasswordRequest(dataForm: {
      password: string
      passwordConfirmation: string
      userId: string
      token: string
    }) {
      this.clearToken()
      //Request Data
      let dataRequest = {
        password: dataForm.password,
        password_confirmation: dataForm.passwordConfirmation,
        userId: dataForm.userId,
        code: dataForm.token,
      }
      apiCluster
        .post(apiRoutes.authResetComplete, dataRequest)
        .then((response) => {
          Helper.redirectTo(apiRoutes.login)
          Notify.create({
            message: 'Tu contraseña se actualizó correctamente.',
            type: 'positive',
          })
        })
        .catch((error) => {
          Notify.create({
            message: 'No se pudo actualizar la contraseña',
            type: 'negative',
          })
        })
    },

    /* site settings */
    

    async getSetting(name){
      const settings = this.settings.siteSettings || null
      if(!settings) return null
      const setting = settings.find((item) => item.name == name)
      
      return setting && setting?.value ? setting.value : null
    }, 

    /* site settings */
    async getSettings(settings: string[]) {
      const config = useRuntimeConfig()

      return await $fetch(`${config.public.apiRoute}/api${apiRoutes.settings}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        params: {
          filter: {
            name: settings,
          },
        },
      })
    },
    /* facebook settings */
    async getFacebookSettings() {
      await this.getSettings(['isite::facebookClientId']).then(
        (response: any) => {
          if (response?.data) {
            this.facebookClientId = response.data['isite::facebookClientId']
          }
        },
      )
    },
    /* google settings */
    async getGoogleSettings() {
      await this.getSettings(['isite::googleClientId']).then(
        (response: any) => {
          if (response?.data) {
            this.googleClientId = response.data['isite::googleClientId']
          }
        },
      )
    },

    //user edit

    async editProfileInfo(data: {
      'attributes[first_name]'?: string
      'attributes[last_name]'?: string
      'attributes[email]'?: string
      'attributes[medias_single][profile]'?: number
      'attributes[fields]'?: {
        name: string
        value: string | number
      }[]
    }) {
      if (!this.user) throw Error('you must be logged')
      const user = new User(this.user)
      const body: { [key: string]: any } = {
        'attributes[id]': user.id,
        'attributes[is_activated]': 1,
        ...data,
      }
      if (body['attributes[fields]']) {
        const currentFields = Object.keys(user.extraFields)
        const fields = body['attributes[fields]']
        delete body['attributes[fields]']
        fields.forEach(
          (
            item: {
              name: string
              value: string | number
            },
            i: number,
          ) => {
            body[`attributes[fields][${i}][name]`] = item.name
            body[`attributes[fields][${i}][value]`] = item.value
            if (currentFields.includes(item.name)) {
              const oldField = user.fields.find((field) => {
                return field.name === item.name
              })
              if (oldField) body[`attributes[fields][${i}][id]`] = oldField.id
            }
          },
        )
      }

      apiCluster
        .put(apiRoutes.profileUsers + `/${this.user?.id}`, body)
        .then((response) => {
          Notify.create({
            message: 'Usuario actualizado exitosamente.',
            type: 'positive',
          })
          this.requestFullUser()
        })
        .catch((e) => {
          Notify.create({
            message: 'No se pudo actualizar el usuario.',
            type: 'positive',
          })
          throw e
        })
    },

    async changeProfileImage(img: File) {
      if (!this.user) throw Error('you must be logged')
      const { data: dataMedia }: any = await apiCluster.fileUpload(img)
      this.editProfileInfo({
        'attributes[medias_single][profile]': dataMedia.id,
      })
    },

    async changeSocialMedia(socialMedia: {
      google?: string
      facebook?: string
      twitter?: string
      linkedin?: string
      web?: string
    }) {
      this.editProfileInfo({
        'attributes[fields]': [
          {
            name: 'socialNetworks',
            value: JSON.stringify(socialMedia),
          },
        ],
      })
    },

    async addSkill(tagToAttach: ProjectTag) {
      if (!this.user) throw Error('you must be logged')
      const body = {
        attributes: {
          title: tagToAttach.title,
          user_id: this.user.id,
          entity_type: EntityTypes.Categories,
          entity_id: tagToAttach.id,
        },
      }
      try {
        await apiCluster.post(apiRoutes.profileSkills, body)

        return await this.requestFullUser()
      } catch (error) {
        console.error(error)
      }
    },

    async removeSkill(skillToRemove: UserSkill) {
      if (!this.user) throw Error('you must be logged')
      apiCluster
        .delete(apiRoutes.profileSkills + `/${skillToRemove.id}`)
        .then((response) => {
          this.requestFullUser()
        })
        .catch((e) => {
          console.error(e)
        })
    },

    async addExperience(experience: {
      img?: File
      title: string
      description: string
      dateInit: string
      dateEnd?: string
      skill?: string
      place: string
    }) {
      if (!this.user) throw Error('you must be logged')
      const body: { [key: string]: any } = {
        attributes: {
          es: {
            title: experience.title,
            description: experience.description,
          },
          user_id: this.user.id,
          type: 'experience',
          options: {
            dateInit: experience.dateInit,
            dateEnd: experience.dateEnd,
            place: experience.place,
            skill: experience.skill,
          },
        },
      }
      if (experience.img) {
        const { data: dataMedia }: any = await apiCluster.fileUpload(
          experience.img,
        )
        body.attributes['medias_single'] = {
          mainimage: dataMedia.id,
        }
      }
      return apiCluster
        .post(apiRoutes.profileInformation, body)
        .then((response) => {
          this.requestFullUser()
          Notify.create({
            message: 'Experiencia agregada!',
            type: 'positive',
          })
          return true
        })
        .catch((e) => {
          console.error(e)
          Notify.create({
            message: 'No se pudo crear',
            type: 'negative',
          })
          throw e
        })
    },

    async addPortfolio(experience: {
      img?: File
      title: string
      description: string
      dateInit: Date
      dateEnd?: Date
      skill?: string
      place: string
    }) {
      if (!this.user) throw Error('you must be logged')
      const body: { [key: string]: any } = {
        attributes: {
          es: {
            title: experience.title,
            description: experience.description,
          },
          user_id: this.user.id,
          type: 'portfolio',
          options: {
            dateInit: experience.dateInit,
            dateEnd: experience.dateEnd,
            place: experience.place,
            skill: experience.skill,
          },
        },
      }
      if (experience.img) {
        const { data: dataMedia }: any = await apiCluster.fileUpload(
          experience.img,
        )
        body.attributes['medias_single'] = {
          mainimage: dataMedia.id,
        }
      }
      apiCluster
        .post(apiRoutes.profileInformation, body)
        .then((response) => {
          this.requestFullUser()
        })
        .catch((e) => {
          console.error(e)
        })
    },
  },
})
