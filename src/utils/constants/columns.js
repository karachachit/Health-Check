import * as yup from 'yup'

export const addSpecialistSchema = yup.object().shape({
   firstName: yup
      .string()
      .min(3, 'the lenght should be from 3')
      .required('Поле "firstName" обязательно для заполнения'),
   lastName: yup
      .string()
      .min(2)
      .required('Поле "lastName" обязательно для заполнения')
      .min(3, 'the lenght should be from 3'),
   position: yup
      .string()
      .required('Поле "position" обязательно для заполнения'),
   department: yup
      .string()
      .required('Поле "Отделение" обязательно для заполнения'),
})

export const hours = Array.from({ length: 24 }, (_, index) => ({
   id: index + 1,
   hour: `${index + 1 < 10 ? '0' : ''}${index + 1} ч`,
}))

export const minutes = Array.from({ length: 60 }, (_, index) => ({
   id: index + 1,
   minute: `${index + 1} мин`,
}))
