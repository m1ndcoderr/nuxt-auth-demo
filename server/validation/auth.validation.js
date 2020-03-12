const Joi = require('@hapi/joi')

const minEmailLength = 8
const minPasswordLength = 8
const maxPasswordLength = 16

module.exports.loginSchema = Joi.object()
  .length(2)
  .options({ abortEarly: false })
  .keys({
    email: Joi.string()
      .email({ multiple: false })
      .required()
      .error(
        new Error(
          `email - обязательное поле c минимальной длинной ${minEmailLength}.`
        )
      ),
    password: Joi.string()
      .regex(new RegExp('^[a-zA-Z0-9]{8,16}$'))
      .required()
      .error(
        new Error(
          `password - обязательное поле с минимальной длинной ${minPasswordLength} и максимальной длинной ${maxPasswordLength}.`
        )
      )
  })
  .required()
  .error(new Error('В форму логина не пришли данные.'))

module.exports.registerSchema = Joi.object()
  .length(3)
  .options({ abortEarly: false })
  .keys({
    email: Joi.string()
      .required()
      .min(minEmailLength)
      .email({ multiple: false })
      .error(
        new Error(
          `email - обязательное поле c минимальной длинной ${minEmailLength}.`
        )
      ),
    password: Joi.string()
      .regex(new RegExp('^[a-zA-Z0-9]{8,16}$'))
      .required()
      .error(
        new Error(
          `password - обязательное поле с минимальной длинной ${minPasswordLength} и максимальной длинной ${maxPasswordLength}.`
        )
      ),
    repeat: Joi.ref('password')
  })
  .required()
  .error(new Error('В форму регистрации не пришли данные.'))
