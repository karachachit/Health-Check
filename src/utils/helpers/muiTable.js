// import styled from 'styled-components'
// import './App.css'
// import PatientTable from './utils/constants/PatientTable'
// import AppTable from './utils/constants/AppTable'
// import DrElenaImage from './assets/images/drElena.png'
// import { DeleteIcon } from './assets'

// function App() {
//    const data = [
//       {
//          id: 1,
//          img: DrElenaImage,
//          fullName: 'Манак Елена',
//          career: 'Окулист',
//          date: '12.01.2023',
//          oclock: '15:00',
//          condition: 'Отменён',
//       },
//       {
//          id: 2,
//          img: DrElenaImage,
//          fullName: 'Манак Елена',
//          career: 'Окулист',
//          date: '12.01.2023',
//          oclock: '15:00',
//          condition: 'Подтверждён',
//       },
//       {
//          id: 3,
//          fullName: 'Манак Елена',
//          career: 'Окулист',
//          date: '12.01.2023',
//          oclock: '15:00',
//          condition: 'Завершён',
//          status: 'avaz',
//       },
//       {
//          id: 3,
//          fullName: 'Манак Елена',
//          career: 'Окулист',
//          date: '12.01.2023',
//          oclock: '15:00',
//          condition: 'Завершён',
//          status: 'avaz',
//       },
//    ]
//    const columns = [
//       {
//          id: 'fullName',
//          img: <DrElenaImage />,
//          label: 'Выбор специалиста',
//          render: () => {
//             return (
//                <FiristTable>
//                   <img src={DrElenaImage} alt="" />
//                   <div>
//                      <p>Манак Елена</p>
//                      <p
//                         style={{
//                            color: '#959595',
//                         }}
//                      >
//                         Окулист
//                      </p>
//                   </div>
//                </FiristTable>
//             )
//          },
//       },
//       { id: 'date', label: 'Дата и время' },
//       { id: 'condition', label: 'Статус' },
//       { id: 'status', label: 'state' },
//       { id: 'oclock', label: 'state' },
//       { id: '', label: 'Очистить список заказов', icon: <DeleteIcon /> },
//    ]

//    return (
//       <div className="App">
//          <AppTable columns={columns} data={data} />
//          <PatientTable />
//       </div>
//    )
// }
// export default App
// const FiristTable = styled('div')({
//    display: 'flex',
//    alignItems: 'center',

//    '& div': {
//       paddingTop: '0.7rem',
//    },
//    '& img': { width: '1.7rem', height: '1.7rem' },
//    '& p': {
//       fontSize: '0.8rem',
//       paddingLeft: '0.7rem',
//       fontFamily: 'Manrope',
//    },
// })
