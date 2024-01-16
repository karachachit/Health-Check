import { styled } from '@mui/material'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useDropzone } from 'react-dropzone'
import { useParams } from 'react-router-dom'
import {
   FileGoogleIcon,
   FileGoogleIconWhite,
   FileIcon,
   PdfFileIcon,
   PlusIcon,
} from '../../assets'
import Button from '../../components/UI/Button'
import Modal from '../../components/UI/Modal'
import { SelectUI } from '../../components/UI/Select'
import {
   getPatientsAsyncThunk,
   postPatientsResultThunk,
} from '../../store/patient/patientsThunk'

import { getAllDepartments } from '../../store/department/departmentThunk'
import { DEPARTMENTS } from '../../utils/services/med_service'
import DatePicker from '../../components/UI/DatePicker'
import { notify } from '../../utils/constants/snackbar'

export const PatientsInternalPage = () => {
   const [isModalOpen, setIsModalOpen] = useState(false)
   const [image, setImage] = useState('')
   const [newData, setNewData] = useState({ service: '', date: '' })
   const [isFormValid, setIsFormValid] = useState(false)
   const [isHovered, setIsHovered] = useState({ id: 0, isHovered: false })

   const { data, results } = useSelector((state) => state.patients)
   const { patientId } = useParams()

   const handleChange = (e) => {
      const file = e.target.files[0]
      if (file.type === 'application/pdf') {
         setImage(file)
      } else {
         notify('должен pdf файл', 'warning')
      }
   }

   const handleDrop = (AcceptFiles) => {
      const file = AcceptFiles[0]
      if (file.type === 'application/pdf') {
         setImage(file)
      } else {
         notify('Должен быть PDF файл', 'warning')
      }
   }

   const { getRootProps, getInputProps } = useDropzone({
      onDrop: handleDrop,
      Accept: 'application/pdf',
   })

   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(getPatientsAsyncThunk({ patientId }))
      dispatch(getAllDepartments())
   }, [])

   const handleOpenModal = () => {
      setIsModalOpen(true)
   }

   const handleCloseModal = () => {
      setIsModalOpen(false)
   }

   const validateForm = () => {
      const isValid =
         newData.service !== '' && newData.date !== '' && image !== null
      setIsFormValid(isValid)
   }
   useEffect(() => {
      validateForm()
   }, [newData, image])

   const onServiceChange = (id) => {
      setNewData((prev) => ({ ...prev, service: id }))
      validateForm()
   }

   const onDateChange = (value) => {
      setNewData((prev) => ({
         ...prev,
         date: value.toISOString().split('T')[0],
      }))
      validateForm()
   }

   const onAddResult = () => {
      const formData = new FormData()
      formData.append('dueDate', newData.date)
      formData.append('patientId', data.id)
      formData.append('pdgFileCheque', image)

      dispatch(
         postPatientsResultThunk({
            departmentId: newData.service,
            dueDate: newData.date,
            patientId: data.id,
            pdgFileCheque: image,
         })
      )
      setIsModalOpen(false)
      setImage(null)
   }

   const patientLabels = {
      firstName: 'Имя',
      lastName: 'Фамилия',
      email: 'Email',
      phoneNumber: 'Номер телефона',
   }
   return (
      <StyleBgPatients>
         <PatintsTitleStyle>
            <h3>
               {data?.firstName} {data?.lastName}
            </h3>
            <Button
               className="customButtonStyle"
               startIcon={<PlusIcon />}
               onClick={handleOpenModal}
            >
               ДОБАВИТЬ РЕЗУЛЬТАТЫ
            </Button>
            <Modal open={isModalOpen} onClose={handleCloseModal}>
               <StyleModalContainer>
                  <h2>Добавление результата</h2>
                  <div className="block-result">
                     <div className="select-date">
                        <SelectUI
                           placeholder="Выберите услугу"
                           options={DEPARTMENTS}
                           className="custom-select"
                           label="Услуги"
                           onChange={onServiceChange}
                        />
                        <div>
                           <label htmlFor="due-date">Дата сдачи</label>
                           <DatePicker
                              className="custom-date-picker"
                              id="due-date"
                              defaultValue={dayjs()}
                              onChange={onDateChange}
                              variant="custom"
                           />
                        </div>
                     </div>
                     <div>
                        <label htmlFor="file">Файлы</label>
                        <Container
                           {...getRootProps()}
                           onClick={(e) => e.stopPropagation()}
                        >
                           <label htmlFor="file">
                              {image ? (
                                 <div>
                                    {image.type === 'application/pdf' && (
                                       <PdfFileIcon className="insert-file" />
                                    )}
                                 </div>
                              ) : (
                                 <FileIcon className="insert-file" />
                              )}
                              <input
                                 id="file"
                                 style={{ display: 'none' }}
                                 type="file"
                                 onChange={handleChange}
                                 {...getInputProps()}
                              />
                           </label>
                           <div>
                              <p>Нажмите или перетащите файл</p>
                              <p>
                                 Минимальное <br /> разрешение 450x600
                              </p>
                           </div>
                        </Container>
                     </div>
                     <div className="block-buttons">
                        <Button
                           className="button-result"
                           variant="normal"
                           onClick={() => setIsModalOpen(false)}
                        >
                           ОТМЕНИТЬ
                        </Button>
                        <Button
                           onClick={onAddResult}
                           className="button-result"
                           disabled={!isFormValid}
                        >
                           ДОБАВИТЬ
                        </Button>
                     </div>
                  </div>
               </StyleModalContainer>
            </Modal>
         </PatintsTitleStyle>
         <StylePatientsData>
            <div>
               <h3>
                  {data?.firstName} {data?.lastName}
               </h3>
               <StyledList>
                  {Object.entries(data || {}).map(
                     ([fieldName, fieldValue], index) =>
                        index !== 0 && (
                           <StyledListItem
                              key={fieldName}
                              fieldName={fieldName}
                           >
                              <label>{patientLabels[fieldName]}</label>
                              <p>{fieldValue}</p>
                           </StyledListItem>
                        )
                  )}
               </StyledList>
            </div>
            {results && results.length > 0 && (
               <StyledPatientsCard>
                  {results?.map((result) => (
                     <StyledResult key={result.id}>
                        <p>
                           Услуга
                           <span>{result.departmentName}</span>
                        </p>
                        <p>
                           Дата и время
                           <span> {result.dateOfUploadingResult}</span>
                           <span>{result.timeOfUploadingResult}</span>
                        </p>
                        <p>
                           Номер заказа <span>{result.resultNumber}</span>
                        </p>
                        <p>
                           Загруженный файл
                           <span>
                              {result.pdgFileCheque && (
                                 <a
                                    href={result.pdgFileCheque}
                                    target="noreferrer"
                                    onMouseEnter={() =>
                                       setIsHovered({
                                          isHovered: true,
                                          id: result.id,
                                       })
                                    }
                                    onMouseLeave={() =>
                                       setIsHovered({
                                          isHovered: false,
                                          id: result.id,
                                       })
                                    }
                                 >
                                    {isHovered.isHovered &&
                                    isHovered.id === result.id ? (
                                       <FileGoogleIconWhite className="file-icon" />
                                    ) : (
                                       <FileGoogleIcon className="file-icon" />
                                    )}
                                 </a>
                              )}
                           </span>
                        </p>
                     </StyledResult>
                  ))}
               </StyledPatientsCard>
            )}
         </StylePatientsData>
      </StyleBgPatients>
   )
}

const Container = styled('div')`
   display: flex;
   align-items: center;
   gap: 20px;
   .insert-file {
      cursor: pointer;
      width: 7rem;
      height: 16vh;
      border-radius: 8px;
      padding: 35px;
      background-color: #e0e2e7;
      margin-top: 5px;
   }
   p {
      margin: 10px 0;
   }
   p:nth-of-type(2) {
      font-size: 12px;
      font-weight: 400;
      color: #959595;
   }
`
const StyledPatientsCard = styled('div')`
   display: flex;
   flex-direction: column;
   gap: 10px;
`

const StyleModalContainer = styled('div')`
   width: 35.5rem;
   height: 53vh;
   padding: 0 5%;
   h2 {
      text-align: center;
      font-size: 24px;
      font-weight: 500;
      color: #222;
   }
   .block-result {
      display: flex;
      flex-direction: column;
      gap: 25px;
      margin-top: 1.7rem;
   }
   .select-date {
      display: flex;
      gap: 10px;
      .custom-select {
         border-radius: 6px;
         height: 7vh;
         margin-top: 8px;
      }
      .custom-date-picker {
         margin-top: 8px;
         height: 7vh;
         border: 2px solid #d9d9d9;
      }
      .css-1qpqzc2-MuiButtonBase-root-MuiPickersDay-root {
         background-color: green;
      }
      .Mui-selected {
         background-color: green !important;
      }

      .MuiPickersDay-daySelected {
         background-color: blue !important;
      }

      .MuiPickersDay-dayDisabled {
         color: red !important;
      }

      .css-1ljbs16-MuiInputBase-root-MuiOutlinedInput-root {
         height: 7vh;
      }
   }
   .block-buttons {
      display: flex;
      gap: 15px;
      width: 100%;
      max-width: 100%;
   }
   .button-result {
      width: 16rem;
   }
   label {
      color: #4d4e51;
   }
`
const StyleBgPatients = styled('div')`
   background-color: #f5f5f5;
   padding: 7rem 4% 1rem 4%;
   height: 100%;
`
const PatintsTitleStyle = styled('div')`
   display: flex;
   justify-content: space-between;
   align-items: center;
   h3 {
      font-size: 22px;
      font-weight: 500;
   }
   .customButtonStyle {
      width: 18rem;
   }

   .css-8je8zh-MuiTouchRipple-root {
      width: 500px;
   }
`
const StylePatientsData = styled('div')`
   display: flex;
   justify-content: space-between;
   background-color: #fff;
   border-radius: 8px;
   margin-top: 20px;
   padding: 20px 45px 20px 20px;
   min-height: 74vh;
   h3 {
      font-size: 20px;
      font-weight: 500;
   }
`
const StyledList = styled('ul')`
   list-style: none;
   display: flex;
   flex-direction: column;
   gap: 10px;
   margin-top: 10px;
`
const StyledResult = styled('ul')`
   display: flex;
   justify-content: space-between;
   width: 60rem;
   height: 30vh;
   border-radius: 8px;
   padding: 4vh;
   background-color: #dbebff;
   p {
      display: flex;
      flex-direction: column;
      gap: 10px;
      font-size: 16px;
      font-weight: 500;
      span {
         font-size: 16px;
         font-weight: 400;
         margin-bottom: -12px;
      }
      &:last-child {
         text-align: center;
      }
   }

   .file-icon {
      width: 50px;
      height: 50px;
      padding: 10px;
      border-radius: 4px;
      display: inline-block;
      background-color: #fff;
   }

   .file-icon:hover {
      background-color: #346efb;
   }
`
const StyledListItem = styled('li')`
   label {
      font-size: 14px;
      font-weight: 400;
      color: #4d4e51;
   }
   p {
      font-size: 16px;
      font-weight: 400;
   }
   order: ${(props) =>
      (props.fieldName === 'email' && '3') ||
      (props.fieldName === 'phoneNumber' && '4')};
`
