import { TableCell, styled } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import AppTable from '../../components/UI/AppTable'
import { AppDeleteIcon } from '../../assets'
import {
   deletePatient,
   fetchPatients,
   searchPatients,
} from '../../store/patient/patientsThunk'
import SearchInput from '../../components/UI/SearchInput'

export const PatientsAdmin = () => {
   const dispatch = useDispatch()
   const { patients } = useSelector((state) => state.patients)
   const [searchTerm, setSearchTerm] = useState('')
   useEffect(() => {
      dispatch(fetchPatients())
   }, [dispatch])
   const handleSearchById = (value) => {
      dispatch(searchPatients(value))
   }
   useEffect(() => {
      const delayDebounceFn = setTimeout(() => {
         if (searchTerm) {
            handleSearchById(searchTerm)
         } else {
            dispatch(fetchPatients())
         }
      }, 1000)
      return () => clearTimeout(delayDebounceFn)
   }, [searchTerm, dispatch])
   const handleChange = (event) => {
      const inputValue = event.target.value
      setSearchTerm(inputValue)
   }
   const handleDelete = (patientId) => {
      dispatch(deletePatient(patientId))
   }
   const columns = [
      {
         id: 'id',
         label: '№',
         render: (_, index) => (
            <TableCell key={index + 1}>{index + 1}</TableCell>
         ),
      },
      { id: 'fullName', label: 'Имя Фамилия' },
      { id: 'phoneNumber', label: 'Номер телефона' },
      { id: 'email', label: 'Почта' },
      { id: 'date', label: 'Дата сдачи' },
      {
         id: 'delete',
         label: 'Действия',
         render: (el) => {
            return (
               <th>
                  <AppDeleteIcon
                     className="delete-icon"
                     onClick={() => handleDelete(el.id)}
                  />
               </th>
            )
         },
      },
   ]
   return (
      <StyledContainerApp>
         <div className="appInput">
            <h3>Пациенты</h3>
            <SearchInput value={searchTerm} onChange={handleChange} />
         </div>
         <div className="table">
            <AppTable
               columns={columns}
               data={patients}
               empty={<h1>Пациенты отсутствуют</h1>}
            />
         </div>
      </StyledContainerApp>
   )
}
const StyledContainerApp = styled('div')`
   background-color: #f5f5f5;
   padding: calc(11vh + 3rem) 4% 3.8vh 4%;
   height: 100%;
   .delete-icon {
      cursor: pointer;
   }
   .appInput {
      display: flex;
      flex-direction: column;
      gap: 25px;
      h3 {
         font-size: 24px;
         font-weight: 500;
      }
   }
   .table {
      background-color: #fff;
      border-radius: 6px;
      min-height: 64.4vh;
      margin-top: 1.5rem;
   }
   .flxDTz {
      margin-top: 1.5rem;
   }
   .ifFdNC .MuiTableCell-root {
      width: 40px;
   }
   .css-15wwp11-MuiTableHead-root {
      &:last-of-type th,
      &:last-of-type > tr > th {
         border-bottom: none;
      }
      thead,
      tr:nth-of-type(2n + 2) {
         background-color: rgba(245, 245, 245, 0.61);
      }
   }
   .kRczSm .MuiTableCell-root {
      background: none;
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
