import { TableCell, styled } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useDebounce } from 'use-debounce'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import AppTable from '../../components/UI/AppTable'
import CheckboxUI from '../../components/UI/Checkbox'
import { AppDeleteIcon, PlusIcon } from '../../assets'
import {
   StatusAppointments,
   adminAppointmentsThunk,
   deleteAppointmentsThunk,
   searchAppointmentsByIdAThunk,
} from '../../store/appointments/adminAppointmentsThunk'
import Button from '../../components/UI/Button'
import { ModalAppointments } from './ModalAppointments'
import Modal from '../../components/UI/Modal'
import { notify } from '../../utils/constants/snackbar'
import SearchInput from '../../components/UI/SearchInput'

export const AdminAppointmentsPage = () => {
   const { appointmentsAdmin } = useSelector((state) => state.appointmentsAdmin)
   const [isModalOpen, setIsModalOpen] = useState(false)
   const [deletdModal, setDeletedModal] = useState(false)
   const [appointmentToDelete, setAppointmentToDelete] = useState(null)

   const [searchValue, setSearchValue] = useState('')
   const [selectAll, setSelectAll] = useState(false)
   const [items, setItems] = useState(appointmentsAdmin)

   const [debouncedSearchValue] = useDebounce(searchValue, 1000)

   const dispatch = useDispatch()

   useEffect(() => {
      setItems(appointmentsAdmin)
   }, [appointmentsAdmin])

   useEffect(() => {
      dispatch(adminAppointmentsThunk())
   }, [dispatch])

   const handleOpenModal = () => {
      setIsModalOpen(true)
   }

   const handleCloseModal = () => {
      setIsModalOpen(false)
   }

   const handleDeleteModal = (id) => {
      setDeletedModal((prev) => !prev)
      setAppointmentToDelete(id)
   }
   const handleSearchAppointments = (value) => {
      dispatch(searchAppointmentsByIdAThunk(value))
   }

   useDebounce(() => {
      if (debouncedSearchValue) {
         handleSearchAppointments(debouncedSearchValue)
      } else {
         dispatch(adminAppointmentsThunk())
      }
   }, 1000)

   useEffect(() => {
      if (debouncedSearchValue) {
         handleSearchAppointments(debouncedSearchValue)
      } else {
         dispatch(adminAppointmentsThunk())
      }
   }, [debouncedSearchValue])

   const handleChange = (event) => {
      setSearchValue(event.target.value)
   }
   const handleDeleteSelected = () => {
      const selectedIds = []
      items.forEach((element) => {
         if (element.checked) {
            selectedIds.push(element.id)
         }
      })
      dispatch(deleteAppointmentsThunk(selectedIds))
   }

   const handleSelectAllChange = (e) => {
      const newSelectAll = !selectAll
      setSelectAll(newSelectAll)
      const updatedItems = items.map((item) => ({
         ...item,
         checked: e.target.checked,
      }))
      setItems(updatedItems)
   }

   const handleCheckboxChange = (e, data) => {
      const updatedItems = items.map((item) =>
         item.id === data.id
            ? { ...item, checked: e.target.checked }
            : { ...item }
      )
      setItems(updatedItems)

      const allChecked = updatedItems.every((item) => item.checked)
      setSelectAll(allChecked)
   }

   const handleStatusChange = (e, id) => {
      const check = e.target.checked

      let status = 'CONFIRMED'

      if (check) {
         status = 'COMPLETED'
      }

      dispatch(StatusAppointments({ status, id }))
   }

   const handleDeleteAppointment = (id) => {
      const appointment = items.find((item) => item.id === id)

      if (!appointment) {
         notify(`Appointment with ID ${id} not found`)
         return
      }

      dispatch(deleteAppointmentsThunk([id]))

      setDeletedModal(false)
   }

   const getPatientFullName = (appointmentId) => {
      const appointment = items.find((item) => item.id === appointmentId)

      return appointment ? appointment.patientFullName : ''
   }

   const columns = [
      {
         id: 'checbox',
         label: (
            <CheckboxUI checked={selectAll} onChange={handleSelectAllChange} />
         ),

         render: (item) => {
            return (
               <th>
                  <CheckboxUI
                     checked={Boolean(item.checked)}
                     onChange={(e) => handleCheckboxChange(e, item)}
                  />
               </th>
            )
         },
      },
      {
         id: 'delete',
         label: (
            <AppDeleteIcon
               className="delete-icon"
               onClick={handleDeleteSelected}
            />
         ),
      },
      {
         id: 'id',
         label: '№',
         render: (_, index) => (
            <TableCell key={index + 1}>{index + 1}</TableCell>
         ),
      },
      {
         id: 'patientFullName',
         label: 'Имя и Фамилия',
      },
      {
         id: 'phoneNumber',
         label: 'Номер телефона',
      },
      { id: 'email', label: 'Почта' },
      {
         id: 'position',
         label: 'Выбор услуги',
      },
      { id: 'doctorFullName', label: 'Выбор специалиста' },
      {
         id: 'dateAndTime',
         label: 'Дата и время',
         render: (appointment) => {
            const dateAndTime = appointment.dateAndTime.split(' ')
            const localDate = dateAndTime[0]
            const time = dateAndTime[1]
            return (
               <th>
                  <p>{localDate}</p>
                  <p>{time}</p>
               </th>
            )
         },
      },
      {
         id: 'status',
         label: 'Обработан',
         render: (el) => {
            return (
               <th>
                  <CheckboxUI
                     checked={el.status === 'COMPLETED'}
                     onChange={(e) => handleStatusChange(e, el.id)}
                  />
               </th>
            )
         },
      },
      {
         id: 'action',
         label: 'Действия',
         render: (el) => {
            return (
               <th>
                  <AppDeleteIcon
                     className="delete-icon"
                     onClick={() => handleDeleteModal(el.id)}
                  />
               </th>
            )
         },
      },
   ]
   return (
      <StyledContainerApp>
         <div className="style-nav">
            <div className="title-button">
               <h3>Онлайн-запись</h3>
               <Button
                  className="customButtonStyle"
                  startIcon={<PlusIcon />}
                  onClick={handleOpenModal}
               >
                  ДОБАВИТЬ ЗАПИСЬ
               </Button>
            </div>
            <ul>
               <li>
                  <StyledNavLink
                     to="/online-registration"
                     activeClassName="active"
                  >
                     ОНЛАЙН-ЗАПИСЬ
                  </StyledNavLink>
               </li>
               <li>
                  <StyledScheduleLink
                     to="/online-registration/schedule"
                     activeClassName="active"
                  >
                     РАСПИСАНИЕ
                  </StyledScheduleLink>
               </li>
            </ul>
         </div>
         <SearchInput value={searchValue} onChange={handleChange} />
         <ModalAppointments
            open={isModalOpen}
            onClose={handleCloseModal}
            setIsModalOpen={setIsModalOpen}
         />
         <div className="table">
            <AppTable
               columns={columns}
               data={items}
               empty={<h1>Записи отсутствуют</h1>}
            />
         </div>
         <Modal open={deletdModal} onClose={() => setDeletedModal(false)}>
            <StyleDeletedModal>
               <div className="patient">
                  <p>Вы уверены, что хотите удалить запись</p>
                  <h2>{getPatientFullName(appointmentToDelete)}</h2>
               </div>
               <div className="delete-buttons">
                  <Button
                     variant="normal"
                     onClick={() => setDeletedModal(false)}
                  >
                     Отменить
                  </Button>
                  <Button
                     onClick={() =>
                        handleDeleteAppointment(appointmentToDelete)
                     }
                  >
                     Удалить
                  </Button>
               </div>
            </StyleDeletedModal>
         </Modal>
      </StyledContainerApp>
   )
}

const StyledContainerApp = styled('div')`
   background-color: #f5f5f5;
   padding: calc(11vh + 3rem) 4% 3.8vh 4%;
   height: 101vh;
   .style-nav {
      display: flex;
      flex-direction: column;
      margin-bottom: 3rem;
      ul {
         display: flex;
         gap: 40px;
      }
      li {
         list-style: none;
      }
   }
   .title-button {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
      h3 {
         font-size: 24px;
         font-weight: 500;
      }
   }
   .customButtonStyle {
      width: 15rem;
   }
   tr {
      border-bottom: 1px solid rgba(224, 224, 224, 1);
   }
   th {
      text-align: start;
      font-size: 14px;
      font-weight: 400;
      padding-left: 2vh;
   }
   .delete-icon {
      cursor: pointer;
   }
   .table {
      background-color: #fff;
      border-radius: 6px;
      min-height: 53vh;
      margin-top: 1.5rem;
   }

   .flxDTz {
      margin-top: 1.5rem;
   }

   thead:first-of-type > .css-13wgndv-MuiTableRow-root {
      th:nth-of-type(-n + 3) {
         label {
            margin: 0;
            text-align: left;
         }
         width: 0%;
         padding: 0;
         text-align: center;
      }
      th:last-of-type {
         width: 10px;
         text-align: end;
         padding-left: 0;
      }
      th:nth-last-of-type(-n + 2) {
         width: 30px;
         text-align: end;
      }
   }
   .css-13wgndv-MuiTableRow-root {
      th:first-of-type {
         padding-left: 27px;
      }
      th:last-of-type {
         width: 10px;
         text-align: end;
         padding-right: 10px;
      }
      th:nth-last-of-type(-n + 2) {
         width: 30px;
         text-align: end;
         padding-right: 10px;
      }
   }
`
const StyleDeletedModal = styled('div')`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   gap: 20px;
   padding: 20px 40px;
   .patient {
      text-align: center;
   }
   p {
      font-size: 18px;
   }
   .delete-buttons {
      display: flex;
      justify-content: center;
      gap: 20px;
   }
`

const StyledNavLink = styled(NavLink)`
   text-decoration: none;
   font-size: 13px;
   font-weight: 600;
   color: #707070;
   border-bottom: 2px solid transparent;
   padding-bottom: 1.6vh;
   border-color: #048741;
   color: #048741;
   &:active {
      color: #048741;
   }
`

const StyledScheduleLink = styled(NavLink)`
   text-decoration: none;
   font-size: 13px;
   font-weight: 600;
   color: #707070;
   border-bottom: 2px solid transparent;
   padding-bottom: 1.6vh;
   &:active {
      color: #048741;
   }
`
