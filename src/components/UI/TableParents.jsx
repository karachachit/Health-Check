import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Breadcrumbs, Stack, TableCell, styled } from '@mui/material'
import { NavLink } from 'react-router-dom'
import AppTable from './AppTable'
import { fetchMyAppointments } from '../../store/myappointments/myappointmentsThunk'

export const TableParents = () => {
   const dispatch = useDispatch()
   const myAppointmentsData = useSelector((state) => state.myappointments.data)
   const status = useSelector((state) => state.myappointments.status)

   useEffect(() => {
      if (status === 'idle') {
         dispatch(fetchMyAppointments())
      }
   }, [dispatch, status])

   const columns = [
      {
         id: 'doctorFullName',
         label: 'Выбор специалиста',
         render: (rowData) => (
            <TableCell>
               <StyledNavLink to={`/profile/my-notes/${rowData.id}`}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                     <p>{rowData.doctorFullName}</p>
                     <p>{rowData.position}</p>
                  </div>
               </StyledNavLink>
            </TableCell>
         ),
      },
      {
         id: 'localDate',
         label: 'Дата и время',
         render: (rowData) => (
            <TableCell>
               <StyledNavLink to={`/profile/my-notes/${rowData.id}`}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                     <p>{rowData.localDate}</p>
                     <p>{rowData.time}</p>
                  </div>
               </StyledNavLink>
            </TableCell>
         ),
      },
      {
         id: 'status',
         label: 'Статус',
         render: (rowData) => {
            let color = 'inherit'

            if (rowData.status === 'Отменен') {
               color = 'red'
            } else if (rowData.status === 'Подтвержден') {
               color = 'blue'
            } else if (rowData.status === 'Завершен') {
               color = 'green'
            }

            const statusStyle = { color }

            return <TableCell style={statusStyle}>{rowData.status}</TableCell>
         },
      },
   ]

   return (
      <ContainerApp>
         <Stack spacing={2}>
            <Container separator="›" aria-label="breadcrumb">
               <StyledNavLink to="/">
                  <p>Главная</p>
               </StyledNavLink>
               <p>Мои записи</p>
            </Container>
         </Stack>
         <ContainerMyAppStyle>
            <div>
               <h2>Мои записи</h2>
               <div className="table">
                  <AppTable
                     data={myAppointmentsData}
                     columns={columns}
                     variant="appointments"
                  />
               </div>
            </div>
         </ContainerMyAppStyle>
      </ContainerApp>
   )
}

const ContainerApp = styled('div')(() => ({
   paddingLeft: '100px',
   paddingBottom: '120px',
}))

const ContainerMyAppStyle = styled('div')`
   display: flex;
   gap: 10rem;
   margin-top: 2rem;
   .table {
      width: 44rem;
   }
`

const Container = styled(Breadcrumbs)({
   fontWeight: 400,
   fontSize: '14px',
   lineHeight: '19px',
   paddingTop: '25px',
   marginBottom: '26px',
   fontFamily: 'Manrope',
   fontStyle: 'normal',
   '& .css-1bifq5f-MuiTypography-root-MuiBreadcrumbs-root': {
      fontFamily: 'Manrope',
   },
   ':last-child': {
      color: '#048741',
   },
})

const StyledNavLink = styled(NavLink)({
   textDecoration: 'none',
   fontFamily: 'Manrope',
   fontStyle: 'normal',
})
