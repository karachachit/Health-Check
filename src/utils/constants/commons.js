import { doctorArtur } from '../../assets'

export const months = [
   'января',
   'февраля',
   'марта',
   'апреля',
   'мая',
   'июня',
   'июля',
   'августа',
   'сентября',
   'октября',
   'ноября',
   'декабря',
]

export const DAYS_OF_A_WEEK = [
   'воскресенье',
   'понедельник',
   'вторник',
   'среда',
   'четверг',
   'пятница',
   'суббота',
]

export const daysOfWeekMap = {
   Su: 'ПН',
   Mo: 'ВТ',
   Tu: 'СР',
   We: 'ЧТ',
   Th: 'ПТ',
   Fr: 'СБ',
   Sa: 'ВС',
}
export const DAYS = [
   {
      id: 0,
      label: 'MONDAY',
   },
   {
      id: 1,
      label: 'TUESDAY',
   },
   {
      id: 2,
      label: 'WEDNESDAY',
   },
   {
      id: 3,
      label: 'THURSDAY',
   },
   {
      id: 4,
      label: 'FRIDAY',
   },
   {
      id: 5,
      label: 'SATURDAY',
   },
   {
      id: 6,
      label: 'SUNDAY',
   },
]

export const RUSSIAN_DAYS = [
   { id: 0, label: 'Пн' },
   { id: 1, label: 'Вт' },
   { id: 2, label: 'Ср' },
   { id: 3, label: 'Чт' },
   { id: 4, label: 'Пт' },
   { id: 5, label: 'Сб' },
   { id: 6, label: 'Вс' },
]

export const DAYS_OF_A_WEEK_TRANSLATION = {
   MONDAY: 'Понедельник',
   TUESDAY: 'Вторник',
   WEDNESDAY: 'Среда',
   THURSDAY: 'Четверг',
   FRIDAY: 'Пятница',
   SATURDAY: 'Суббота',
   SUNDAY: 'Воскресенье',
}

export const departments = {
   Аллергология: 'ALLERGOLOGY',
   Вакцинация: 'VACCINATION',
   Гинекология: 'GYNECOLOGY',
   Кардиология: 'CARDIOLOGY',
   Нейрохирургия: 'NEUROSURGERY',
   Ортопедия: 'ORTHOPEDICS',
   Офтальмология: 'OPHTHALMOLOGY',
   Психотерапия: 'PSYCHOTHERAPY',
   Ревмотология: 'RHEUMATOLOGY',
   Урология: 'UROLOGY',
   Эндокринология: 'ENDOCRINOLOGY',
   Анестезиология: 'ANESTHESIOLOGY',
   Гастроэнтерология: 'GASTROENTEROLOGY',
   Дермотология: 'DERMATOLOGY',
   Неврология: 'NEUROLOGY',
   Онкология: 'ONCOLOGY',
   Отоларингология: 'OTOLARYNGOLOGY',
   Проктология: 'PROCTOLOGY',
   Пульмонология: 'PULMONOLOGY',
   Терапия: 'THERAPY',
   Флебология: 'PHLEBOLOGY',
   Физиотерапия: 'PHYSIOTHERAPY',
}

export const schedules = [
   {
      scheduleId: 70,
      doctorImage: doctorArtur,
      doctorFullName: 'Иса Акунбаев',
      doctorPosition: 'Врач-кардиолог',
      dateDayTimeInfos: [
         {
            dateDay: '2023-12-05',
            dayOfWeek: 'TUESDAY',
            timeIntervals: [],
         },
         {
            dateDay: '2023-12-06',
            dayOfWeek: 'WEDNESDAY',
            timeIntervals: [
               {
                  startTime: '08:00:00',
                  endTime: '09:30:00',
               },
               {
                  startTime: '11:00:00',
                  endTime: '12:30:00',
               },
            ],
         },
         {
            dateDay: '2023-12-18',
            dayOfWeek: 'THURSDAY',
            timeIntervals: [],
         },
         {
            dateDay: '2023-12-08',
            dayOfWeek: 'FRIDAY',
            timeIntervals: [
               {
                  startTime: '08:00:00',
                  endTime: '09:30:00',
               },
               {
                  startTime: '09:30:00',
                  endTime: '11:00:00',
               },
               {
                  startTime: '11:00:00',
                  endTime: '12:30:00',
               },
               {
                  startTime: '14:00:00',
                  endTime: '15:30:00',
               },
               {
                  startTime: '15:30:00',
                  endTime: '17:00:00',
               },
               {
                  startTime: '17:00:00',
                  endTime: '18:30:00',
               },
            ],
         },
         {
            dateDay: '2023-12-09',
            dayOfWeek: 'SATURDAY',
            timeIntervals: [],
         },
         {
            dateDay: '2023-12-10',
            dayOfWeek: 'SUNDAY',
            timeIntervals: [],
         },
         {
            dateDay: '2023-12-11',
            dayOfWeek: 'MONDAY',
            timeIntervals: [
               {
                  startTime: '08:00:00',
                  endTime: '09:30:00',
               },
               {
                  startTime: '09:30:00',
                  endTime: '11:00:00',
               },
               {
                  startTime: '11:00:00',
                  endTime: '12:30:00',
               },
               {
                  startTime: '14:00:00',
                  endTime: '15:30:00',
               },
               {
                  startTime: '15:30:00',
                  endTime: '17:00:00',
               },
               {
                  startTime: '17:00:00',
                  endTime: '18:30:00',
               },
            ],
         },
      ],
   },
   {
      scheduleId: 70,
      doctorImage: doctorArtur,
      doctorFullName: 'Иса Акунбаев',
      doctorPosition: 'Врач-кардиолог',
      dateDayTimeInfos: [
         {
            dateDay: '2023-12-05',
            dayOfWeek: 'TUESDAY',
            timeIntervals: [],
         },
         {
            dateDay: '2023-12-06',
            dayOfWeek: 'WEDNESDAY',
            timeIntervals: [
               {
                  startTime: '08:00:00',
                  endTime: '09:30:00',
               },
               {
                  startTime: '11:00:00',
                  endTime: '12:30:00',
               },
            ],
         },
         {
            dateDay: '2023-12-18',
            dayOfWeek: 'THURSDAY',
            timeIntervals: [],
         },
         {
            dateDay: '2023-12-08',
            dayOfWeek: 'FRIDAY',
            timeIntervals: [
               {
                  startTime: '08:00:00',
                  endTime: '09:30:00',
               },
               {
                  startTime: '09:30:00',
                  endTime: '11:00:00',
               },
               {
                  startTime: '11:00:00',
                  endTime: '12:30:00',
               },
               {
                  startTime: '14:00:00',
                  endTime: '15:30:00',
               },
               {
                  startTime: '15:30:00',
                  endTime: '17:00:00',
               },
               {
                  startTime: '17:00:00',
                  endTime: '18:30:00',
               },
            ],
         },
         {
            dateDay: '2023-12-09',
            dayOfWeek: 'SATURDAY',
            timeIntervals: [],
         },
         {
            dateDay: '2023-12-10',
            dayOfWeek: 'SUNDAY',
            timeIntervals: [],
         },
         {
            dateDay: '2023-12-11',
            dayOfWeek: 'MONDAY',
            timeIntervals: [
               {
                  startTime: '08:00:00',
                  endTime: '09:30:00',
               },
               {
                  startTime: '09:30:00',
                  endTime: '11:00:00',
               },
               {
                  startTime: '11:00:00',
                  endTime: '12:30:00',
               },
               {
                  startTime: '14:00:00',
                  endTime: '15:30:00',
               },
               {
                  startTime: '15:30:00',
                  endTime: '17:00:00',
               },
               {
                  startTime: '17:00:00',
                  endTime: '18:30:00',
               },
            ],
         },
      ],
   },
   {
      scheduleId: 70,
      doctorImage: doctorArtur,
      doctorFullName: 'Иса Акунбаев',
      doctorPosition: 'Врач-кардиолог',
      dateDayTimeInfos: [
         {
            dateDay: '2023-12-05',
            dayOfWeek: 'TUESDAY',
            timeIntervals: [],
         },
         {
            dateDay: '2023-12-18',
            dayOfWeek: 'WEDNESDAY',
            timeIntervals: [
               {
                  startTime: '08:00:00',
                  endTime: '09:30:00',
               },
               {
                  startTime: '11:00:00',
                  endTime: '12:30:00',
               },
            ],
         },
         {
            dateDay: '2023-12-18',
            dayOfWeek: 'THURSDAY',
            timeIntervals: [],
         },
         {
            dateDay: '2023-12-12',
            dayOfWeek: 'FRIDAY',
            timeIntervals: [
               {
                  startTime: '08:00:00',
                  endTime: '09:30:00',
               },
               {
                  startTime: '09:30:00',
                  endTime: '11:00:00',
               },
               {
                  startTime: '11:00:00',
                  endTime: '12:30:00',
               },
               {
                  startTime: '14:00:00',
                  endTime: '15:30:00',
               },
               {
                  startTime: '15:30:00',
                  endTime: '17:00:00',
               },
               {
                  startTime: '17:00:00',
                  endTime: '18:30:00',
               },
            ],
         },
         {
            dateDay: '2023-12-16',
            dayOfWeek: 'SATURDAY',
            timeIntervals: [
               {
                  startTime: '08:00:00',
                  endTime: '09:30:00',
               },
               {
                  startTime: '09:30:00',
                  endTime: '11:00:00',
               },
               {
                  startTime: '11:00:00',
                  endTime: '12:30:00',
               },
               {
                  startTime: '14:00:00',
                  endTime: '15:30:00',
               },
               {
                  startTime: '15:30:00',
                  endTime: '17:00:00',
               },
               {
                  startTime: '17:00:00',
                  endTime: '18:30:00',
               },
            ],
         },
         {
            dateDay: '2023-12-10',
            dayOfWeek: 'SUNDAY',
            timeIntervals: [],
         },
         {
            dateDay: '2023-12-11',
            dayOfWeek: 'MONDAY',
            timeIntervals: [],
         },
      ],
   },
]
