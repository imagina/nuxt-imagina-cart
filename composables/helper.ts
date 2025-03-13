const lang: { [key: string]: any } = {
  appbar: {
    nav: {
      briefcase: 'portafolio',
      explore: 'explorar proyectos',
      login: 'iniciar sesión',
      register: 'registrarse',
    },
    publish_project: 'Publicar un proyecto',
  },
  landing: {
    title: {
      content:
        'Conecta ahora tus ideas {br} con {highlight} en {br2} tecnología para hacerlas realidad',
      highlight: 'manos expertas',
    },
    publishProject: 'Publicar proyectos',
    findProject: 'Buscar Proyectos',
    recentProjects: 'Lo más reciente',
  },

  auth: {
    login: {
      title: 'Iniciar sesión',
      subtitle: 'Bienvenido nuevamente',
      inputs: {
        email: 'Email',
        password: 'Contraseña',
        rememberMe: 'Recordar usuario',
      },
      forgotPassword: '¿Olvidaste tu contraseña?',
      submitBtn: 'Ingresar',
      withoutAccount: {
        content: '¿No tienes una cuenta?',
        link: 'Regístrate',
      },
    },
    register: {
      title: 'Registro',
      inputs: {
        firstName: 'Nombre',
        lastName: 'Apellido',
        email: 'Email',
        password: 'Contraseña',
        passwordAgain: 'Repetir contraseña',
        termsAndCond: {
          content: 'Acepto el {highlight1} y la {highlight2}.',
          highlight1: 'Acuerdo de usuario',
          highlight2: 'Política de privacidad',
        },
      },
      submitBtn: 'Registrarme',
      existAccount: {
        content: '¿Ya tienes una cuenta?',
        link: 'Ingresar',
      },
    },
    reset: {
      title: 'Recuperar Contraseña',
      submitBtn: 'Recuperar Contraseña',
      confirmPassword: 'Confirmar Contraseña',
    },
  },
  projects: {
    singular: 'Proyecto ',
    create: {
      pages: {
        one: {
          title: 'Cuéntanos qué necesitas',
          description:
            'Recibe ofertas de los principales expertos de la industria TIC y escoge la propuesta que mejor se adapte a tu necesidad.',
        },
        two: {
          title: '¿Qué habilidades se necesitan?',
          description:
            'Ingresa hasta 5 habilidades que describen mejor tu proyecto. Los freelancers utilizarán estas habilidades para encontrar proyectos en los que están más interesados y experimentados.',
        },
        three: {
          title: '¿Como quieres pagar?',
        },
        four: {
          title: '¿Son correctos tus datos?',
        },
      },
      form: {
        name: {
          label: 'Elige un nombre para tu proyecto',
          placeholder: 'p. ej., Necesito un sitio web',
        },
        description: {
          label: 'Explica tu proyecto',
          placeholder: 'Describe tu proyecto aquí...',
          clearBtn: 'Borrar descripción',
        },
        files: {
          empty: {
            title: 'Adjuntar Documentos',
            description:
              'Arrastra y suelta cualquier imagen o documento que podría resultar útil para explicar aquí tu proyecto (tamaño de archivo máx 25 MB)',
          },
          loadedMsg: 'Documentos adjuntados',
        },
        skills: {
          label: 'Elige las habilidades necesarias para tu proyecto',
          placeholder: 'Ingresa habilidades aquí...',
          suggested: 'Habilidades sugeridas:',
        },
        prices: {
          details: {
            title: 'Precio fijo',
            description:
              'Acepta un precio fijo y libera el pago cuando se realice el trabajo. Es mejor para tareas esporádicas.',
          },
          label: 'Elige un el rango de precios para tu proyecto',
        },
        final: {
          label: 'Detalles del proyecto',
        },
        buttons: {
          back: 'Volver',
          next: 'Siguiente',
          submit: 'Crear',
        },
      },
    },
  },
}

export const Helper = {
  //convert a date string with the format "YYYY-MM-DD HH:mm:ss" to a date
  parseStringToDate: (
    fechaString?: string | null,
    formato: string = 'YYYY-MM-DD HH:mm:ss',
  ) => {
    if (!fechaString) return new Date()
    const separadores = formato.match(/[^A-Za-z]/g) || []
    const partesFechaHora = fechaString.split(
      new RegExp(
        `[${separadores
          .map((sep) => {
            if (sep === '-' || sep === '\\' || sep === '.') return `\\${sep}`
            return sep
          })
          .join('')}]`,
      ),
    )

    let anio = 0,
      mes = 0,
      dia = 0,
      horas = 0,
      minutos = 0,
      segundos = 0

    formato.split(/[^A-Za-z]/).forEach((parte, index) => {
      switch (parte) {
        case 'YYYY':
          anio = Number(partesFechaHora[index] ?? 0)
          break
        case 'MM':
          mes = Number(partesFechaHora[index] ?? 0) - 1
          break
        case 'DD':
          dia = Number(partesFechaHora[index] ?? 0)
          break
        case 'HH':
          horas = Number(partesFechaHora[index] ?? 0)
          break
        case 'mm':
          minutos = Number(partesFechaHora[index] ?? 0)
          break
        case 'ss':
          segundos = Number(partesFechaHora[index] ?? 0)
          break
        default:
          throw new Error(`Formato desconocido: ${parte}`)
      }
    })

    return new Date(anio, mes, dia, horas, minutos, segundos)
  },

  parseDateToString: (date: Date, format: string = 'YYYY-MM-DD HH:mm:ss') => {
    const meses = [
      'Ene',
      'Feb',
      'Mar',
      'Abr',
      'May',
      'Jun',
      'Jul',
      'Ago',
      'Sep',
      'Oct',
      'Nov',
      'Dic',
    ]
    const diasSemana = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb']
    const map: { [key: string]: string } = {
      DD: ('0' + date.getDate()).slice(-2),
      D: `${date.getDate()}`,
      MMMM: date.toLocaleString('es-ES', { month: 'long' }),
      MMM: meses[date.getMonth()],
      MM: ('0' + (date.getMonth() + 1)).slice(-2),
      M: `${date.getMonth() + 1}`,
      YYYY: `${date.getFullYear()}`,
      YY: String(date.getFullYear()).slice(-2),
      dddd: diasSemana[date.getDay()],
      ddd: date.toLocaleString('es-ES', { weekday: 'short' }),
    }
    return format.replace(
      /DD|D|MMMM|MMM|MM|M|YYYY|YY|dddd|ddd/g,
      (matched) => <string>map[matched],
    )
  },
  calculateDifferencesBetweenDays(date1?: Date, date2?: Date) {
    if (!date1) date1 = new Date()
    if (!date2) date2 = new Date()
    // Calcular la diferencia en miliSeconds
    let diffMiliSeconds = Math.abs(date2.getTime() - date1.getTime())
    let diffSeconds = Math.floor(diffMiliSeconds / 1000)
    let diffMinutes = Math.floor(diffSeconds / 60)
    let diffHours = Math.floor(diffMinutes / 60)
    let diffDays = Math.floor(diffHours / 24)
    let diffMonth = Math.floor(diffDays / 30)
    let diffYear = Math.floor(diffMonth / 12)
    const diff = {
      miliSeconds: diffMiliSeconds % 1000,
      seconds: diffSeconds % 60,
      minutes: diffMinutes % 60,
      hours: diffHours % 24,
      days: diffDays % 30,
      month: diffMonth % 12,
      years: diffYear,
    }
    return diff
  },

  //Convert object keys to snake_case
  toSnakeCase: (object: any, params: { [key: string]: any } = {}) => {
    //Items to ignore when try to convert to snakeCase
    const notToSnakeCase = [
      ...(params.notToSnakeCase || []),
      ...['options', 'fields', 'settings', 'permissions'],
    ]
    const keysNotToSnakeCase = params.keysNotToSnakeCase || []
    //function recursive to loop all items from object
    let convertObject = (dataObject: any) => {
      let response: { [key: string]: any } = {} //Object to save fields vonverted
      //Loop all items for convert

      for (var item in dataObject) {
        let itemValue = dataObject[item] //Value from item
        if (!notToSnakeCase.includes(item)) {
          //If value is object, also convert value
          if (typeof itemValue === 'object' && itemValue !== null) {
            if (Array.isArray(itemValue)) {
              itemValue = itemValue.map((item) =>
                typeof item == 'object' ? convertObject(item) : item,
              )
            } else itemValue = convertObject(dataObject[item])

            //itemValue = convertObject(dataObject[item])
          }
          //Add to response new Key with Value
          let objKey = keysNotToSnakeCase.includes(item)
            ? item
            : Helper.convertStringToSnakeCase(item)
          response[objKey] = itemValue !== undefined ? itemValue : null
        } else {
          response[item] = itemValue
        }
      }
      return response
    }
    return convertObject(object) //Return response
  },

  //Convert strings to snake_case
  convertStringToSnakeCase: (string: string) =>
    string.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`),

  timestamp: (date?: Date | null) => {
    date = date ? date : new Date()
    return (date.getTime() / 1000) | 0
  },

  // Detect Device
  detectDevice: () => {
    const userAgent = navigator.userAgent.toLowerCase()

    let device = 'Unknown'
    let version = 'Unknown'

    if (/iphone|ipad|ipod/.test(userAgent)) {
      device = 'iPhone/iPad/iPod'
      const versionMatch = userAgent.match(/os (\d+_\d+)/)
      if (versionMatch) {
        version = versionMatch[1].replace('_', '.')
      }
    } else if (/android/.test(userAgent)) {
      device = 'Android'
      const versionMatch = userAgent.match(/android (\d+(\.\d+)?)/)
      if (versionMatch) {
        version = versionMatch[1]
      }
    } else if (/macintosh|mac os x/.test(userAgent)) {
      device = 'MacOs'
      const versionMatch = userAgent.match(/mac os x (\d+[_\d]+)/)
      if (versionMatch) {
        version = versionMatch[1].replace(/_/g, '.')
      }
    } else if (/windows/.test(userAgent)) {
      device = 'Windows'
      const versionMatch = userAgent.match(/windows nt (\d+(\.\d+)?)/)
      if (versionMatch) {
        version = versionMatch[1]
      }
    }

    return `${device} ${version}`
  },

  /* redirect with router instance*/
  redirectTo(route: string) {
    const router = useRouter()
    router.push(route)
  },

  toggleItem<T>(list: T[], item: T, searchField?: string): T[] {
    list = [...list]
    const itemIndex = list.findIndex((listItem) => {
      if (!searchField) return listItem === item
      else
        return (
          (<Record<string, any>>listItem)[searchField] ===
          (<Record<string, any>>listItem)[searchField]
        )
    })
    if (itemIndex >= 0) {
      list.splice(itemIndex, 1)
    } else {
      list.push(item)
    }
    return list
  },
  tLang(key: string): string {
    let word: any = lang
    key.split('.').forEach((subKey: string) => {
      word = word[subKey]
    })
    return <string>word
  },
}
