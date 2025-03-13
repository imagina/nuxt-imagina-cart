export default class PasswordValidator {
  //   constructor() {
  //     const { t } = useI18n();
  //     this.greeting = t("greeting");
  //   }
  static rules = [
    (val: string) => !!val || 'Contraseña es requerida',
    (val: string) => val.length >= 8 || 'Debe de tener al menos 8 caracteres',
    (val: string) =>
      /[A-Z]/.test(val) || 'Debe de contener al menos una letra mayúscula',
    (val: string) =>
      /[a-z]/.test(val) || 'Debe de contener al menos una letra minúscula',
    (val: string) => /\d/.test(val) || 'Debe contener al menos un número',
    (val: string) =>
      /[\W_]/.test(val) || 'Debe contener al menos un carácter especial',
  ]

  static is_password_valid(password: string) {
    const validators = PasswordValidator.rules
    let is_valid = true
    for (let i = 0; i < validators.length; i++) {
      if (typeof validators[i](password) === 'string') {
        is_valid = false
        break
      }
    }
    return is_valid
  }
}
