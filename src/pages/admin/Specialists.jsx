import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { TableCell, styled } from '@mui/material'

import {
   deleteDoctorThunk,
   doctorsAllThunk,
   doctorsSearchThunk,
   specialistThunk,
   statusDoctorThunk,
} from '../../store/spesialists/specialistsThunk'
import SwitchApp from '../../components/UI/switch/Switch'
import { EditIcon, PlusIcon, TrashIcon } from '../../assets'
import AppTable from '../../components/UI/AppTable'
import Button from '../../components/UI/Button'
import SearchInput from '../../components/UI/SearchInput'

export const Specialists = () => {
   const navigate = useNavigate()
   const { doctors } = useSelector((state) => state.specialists)
   const dispatch = useDispatch()
   const [searchTerm, setSearchTerm] = useState('')
   // const [isStatus, setIsStatus] = useState(false)

   const handleEditClick = (doctorId) => {
      dispatch(specialistThunk(doctorId))
   }

   useEffect(() => {
      dispatch(doctorsAllThunk())
   }, [dispatch])

   const handleDeleteClick = (doctorId) => {
      dispatch(deleteDoctorThunk(doctorId))
   }

   useEffect(() => {
      dispatch(doctorsSearchThunk(searchTerm))
   }, [searchTerm, dispatch])

   const handleSearch = (event) => {
      setSearchTerm(event.target.value)
      dispatch(doctorsSearchThunk(event.target.value))
   }

   const handleStatusChange = (e, id) => {
      let status
      doctors.map((el) => {
         if (el.id === id) {
            status = e.target.checked
         }
         return el
      })
      dispatch(statusDoctorThunk({ value: status, doctorId: id }))
   }

   // const handleStatus = (event, doctorId) => {
   //    dispatch(statusDoctorThunk({ doctorId, value: event.target.checked }))
   // }

   const handleAddSpecialistClick = () => {
      navigate('/specialists/add-doctor')
   }

   const image = 'image'
   const firstName = 'firstName'
   const lastName = 'lastName'
   const position = 'position'
   const scheduleUntil = 'scheduleUntil'
   const columns = [
      {
         id: 'id',
         label: '№',
         render: (_, index) => (
            <TableCell key={index + 1}>{index + 1}</TableCell>
         ),
      },
      {
         id: 'isActive',
         render: (item) => (
            <th>
               <SwitchApp
                  checked={item?.isActive}
                  onChange={(event) => handleStatusChange(event, item.id)}
               />
            </th>
         ),
         label: 'Статус',
      },
      {
         id: 'doctor',
         render: (item) => (
            <th>
               <ContainerDoctor switchApp={item.isActive}>
                  <img src={item[image]} alt="img" />
                  <div>
                     <p className="nameStyle">
                        {item[firstName]} {item[lastName]}
                     </p>
                     <p className="positionStyle">{item[position]}</p>
                  </div>
               </ContainerDoctor>
            </th>
         ),
         label: 'Специалист',
      },
      { id: 'departmentName', label: 'Отделение' },
      { id: scheduleUntil ? 'scheduleUntil' : '-', label: 'Расписание до' },
      {
         id: 'action',
         render: (item) => (
            <IconStyle>
               <div>
                  <Link to={`/specialists/doctor-details/${item.id}`}>
                     <EditIcon
                        onClick={() => navigate(handleEditClick(item.id))}
                     />
                  </Link>
               </div>
               <div>
                  <TrashIcon onClick={() => handleDeleteClick(item.id)} />
               </div>
            </IconStyle>
         ),
         label: 'Действия',
      },
   ]

   return (
      <ContainerMain>
         <Container>
            <div className="appInput">
               <div className="title-button">
                  <h3>Специалисты</h3>
                  <Button
                     className="customButtonStyle"
                     startIcon={<PlusIcon />}
                     onClick={handleAddSpecialistClick}
                  >
                     ДОБАВИТЬ СПЕЦИАЛИСТА
                  </Button>
               </div>
               <StyledSearchInput value={searchTerm} onChange={handleSearch} />
            </div>
            <ContainerApp>
               <AppTable columns={columns} data={doctors} />
            </ContainerApp>
         </Container>
      </ContainerMain>
   )
}

const Container = styled('div')`
   text-align: start;
   height: 80vh;
   .appInput {
      display: flex;
      flex-direction: column;
      gap: 25px;
   }
   .title-button {
      display: flex;
      justify-content: space-between;
      align-items: center;
      h3 {
         font-size: 22px;
         font-weight: 500;
      }
   }
   .customButtonStyle {
      width: 16rem;
   }
`
const ContainerMain = styled('div')`
   padding: calc(11vh + 3rem) 4% 3.8vh 4%;
   .flxDTz {
      margin-top: 0 !important;
   }
   tr {
      border-bottom: 1px solid #d9d9d9;
   }
   .css-dmmspl-MuiFormGroup-root {
      margin-left: 0.9rem;
   }
   thead:first-of-type > .css-13wgndv-MuiTableRow-root {
      /* background-color: red; */
      th:nth-of-type(-n + 0) {
         text-align: start;
      }

      th:nth-of-type(-n + 1) {
         text-align: start;
         padding-right: 3rem;
      }

      th:nth-of-type(-n + 2) {
         text-align: start;
      }

      th:last-of-type {
         text-align: end;
         margin-bottom: 30px;
      }

      th:nth-of-type(-n + 1) {
         width: 30px;
      }
   }
   background-color: #f5f5f5;
   height: max-content;
`
const ContainerApp = styled('div')`
   background-color: #fff;
   height: max-content;
`

const StyledSearchInput = styled(SearchInput)(() => ({
   paddingBottom: '1.5rem',
}))

const ContainerDoctor = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'flex-start',
   alignItems: 'center',
   gap: '0.5rem',

   '& img': {
      width: '2.3rem',
      height: '2.3rem',
      borderRadius: '2.3rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
   },

   '& div': {
      width: '11rem',
      height: '4rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      flexDirection: 'column',
      textAlign: 'center',
   },

   '& .nameStyle': {
      fontSize: '1rem',
      width: 'max-width',
      textAlign: 'start',
      fontWeight: '500',
   },

   '& .positionStyle': {
      fontSize: '0.8rem',
      fontWeight: '400',
   },
}))

const IconStyle = styled('div')(() => ({
   display: 'flex',
   gap: '1rem',
   marginRight: '1rem',
   marginTop: '1.25rem',
   justifyContent: 'flex-end',
   '& div': {
      cursor: 'pointer',
   },
}))
