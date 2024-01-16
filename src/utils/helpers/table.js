import React from 'react'
import {
   Table as MuiTable,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TableRow,
   Paper,
   styled,
} from '@mui/material'

export const Table = ({ data, columns }) => {
   return (
      <Container>
         <TableContainer component={Paper}>
            <MuiTableStyled>
               <TableHead>
                  <TableRowColumns>
                     {columns?.map((column) => (
                        <TableCell key={column.id}>{column.label}</TableCell>
                     ))}
                  </TableRowColumns>
               </TableHead>
               <TableBody>
                  <MainContainerStyled>
                     {data?.map((row) => (
                        <TableRowData key={row.id}>
                           {columns?.map((column) => {
                              if (column.render) {
                                 return column.render(row)
                              }
                              return (
                                 <TableCell
                                    key={column.id}
                                    title={String(row[column.id])}
                                 >
                                    {row[column.id]?.length > 10
                                       ? `${row[column.id].substring(0, 10)}...`
                                       : row[column.id]}
                                 </TableCell>
                              )
                           })}
                        </TableRowData>
                     ))}
                  </MainContainerStyled>
               </TableBody>
            </MuiTableStyled>
         </TableContainer>
      </Container>
   )
}
const Container = styled('div')`
   .css-ly6ca0-MuiTableCell-root {
      border-bottom: none;
      font-size: none;
   }
   padding: 0;
   margin: 0;
`
const MainContainerStyled = styled('div')`
   display: flex;
   align-items: center;
   justify-content: space-around;
   flex-direction: column;
   gap: 1rem;
   .css-txc5l5-MuiTableCell-root {
      border-bottom: none;
   }
`
const MuiTableStyled = styled(MuiTable)(() => ({
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'flex-start',
   flexDirection: 'column',
}))
const TableRowColumns = styled(TableRow)(() => ({
   width: '62rem',
   height: '4rem',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'space-around',
   columnGap: '60px',
}))
const TableRowData = styled(TableRow)(() => ({
   boxShadow:
      '0px 4px 10px 0px rgba(0, 0, 0, 0.06),0px -4px 10px 0px rgba(0, 0, 0, 0.06)',
   borderRadius: '0.5rem',
   width: '62rem',
   height: '4rem',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'space-around',
   columnGap: '60px',
}))

// import { styled } from '@mui/material'
// import { Check, Eye, TrashCan } from './assets'
// import { Table } from './components/table/Table'
// const data = [
//    {
//       id: 1,
//       name: 'Kubanov Farid ',
//       date: '2034-12-12',
//       test: 'Test number 1',
//       status: 'false',
//       score: 'false',
//    },
//    {
//       id: 2,
//       name: 'Azatov Ulan ',
//       date: '2034-12-12',
//       test: 'Test number 2',
//       status: 'false',
//       score: 'false',
//    },
//    {
//       id: 3,
//       name: 'Maratova Aijan ',
//       date: '2034-12-12',
//       test: 'Test number 1',
//       status: 'true',
//       score: 'true',
//    },
//    {
//       id: 4,
//       name: 'Bekova Aliza',
//       date: '2034-12-12',
//       test: 'Test number 3 ',
//       status: 'true',
//       score: 'true',
//    },
// ]
// const columns = [
//    { id: 'id', label: '#' },
//    { id: 'name', label: 'User Name' },
//    { id: 'date', label: 'Date of submissions' },
//    { id: 'test', label: 'Test' },
//    {
//       id: 'status',
//       label: 'Status',
//       render: (row) => {
//          const statusText = row.status === 'true' ? 'true' : 'false'
//          const color = row.status === 'true' ? 'green' : 'red'
//          return <p style={{ color }}>{statusText}</p>
//       },
//    },
//    {
//       id: '2',
//       label: 'Score',
//       render: (row) => {
//          const scoreText = row.score === 'true' ? 'true' : 'false'
//          const color = row.score === 'true' ? 'green' : 'red'
//          return <p style={{ color }}>{scoreText}</p>
//       },
//    },
//    {
//       id: 'status',
//       label: 'Status',
//       render: (row) => {
//          return (
//             <Container>
//                {row.status === 'true' ? <Eye /> : <Check />}
//                <TrashCan />
//             </Container>
//          )
//       },
//    },
// ]
// function App() {
//    return (
//       <div>
//          {/* <h1>Bilingual js-9:heart:</h1> */}
//          <Table data={data} columns={columns} />
//       </div>
//    )
// }
// export default App
// const Container = styled('div')`
//    display: flex;
//    gap: 0.7rem;
// `
