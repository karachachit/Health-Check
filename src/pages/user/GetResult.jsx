import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useReactToPrint } from 'react-to-print'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import styled from 'styled-components'
import {
   GroupIcon,
   HealthCheckIcon,
   PrinterIcon,
   RemoveIcon,
   SortDescIcon,
   Stotoskop,
} from '../../assets'

import { notify } from '../../utils/constants/snackbar'
import Button from '../../components/UI/Button'
import { Input } from '../../components/UI/input/Input'
import { getResultByResultNumber } from '../../store/getresult/resultThunk'

const GetResult = () => {
   const [searchWord, setSearchWord] = useState('')
   const [showButton, setShowButton] = useState(false)
   const [isDisabled, setIsDisabled] = useState(true)

   const result = useSelector((state) => state.resultSlice.result)

   const dispatch = useDispatch()
   const pdfRef = useRef(null)

   const handleClick = () => {
      setShowButton(true)
      dispatch(getResultByResultNumber(searchWord))
   }
   const handleClose = () => {
      setShowButton(false)
      setSearchWord('')
   }

   const handlePrint = useReactToPrint({
      content: () => pdfRef.current,
   })

   const handleInputChange = (event) => {
      const { value } = event.target
      setSearchWord(value)
      setIsDisabled(value.trim() === '')
   }
   useEffect(() => {
      if (pdfRef.current) {
         console.log(pdfRef.current)
      }
   }, [result.pdgFileCheque])

   const handleSavePDF = () => {
      try {
         html2canvas(pdfRef.current).then((canvas) => {
            const imgData = canvas.toDataURL('image/png')
            const pdf = jsPDF('p', 'px')
            pdf.addImage(imgData, 'PNG', 0, 0)
            pdf.save('document.pdf')
         })
      } catch (error) {
         notify('error', 'Произошла ошибка при сохранении PDF')
      }
   }

   return (
      <Container>
         <FormContainer>
            <div className="FormLogo">
               <GroupIcon />
               <HealthCheckIcon />
            </div>

            <div className="FormInput">
               <div>
                  <Input
                     onChange={handleInputChange}
                     value={searchWord}
                     type="text"
                     placeholder="Введите номер заказа..."
                  />
                  <StyledButton
                     onClick={handleClick}
                     disabled={isDisabled}
                     variant="contained"
                     type="submit"
                  >
                     Найти
                  </StyledButton>
               </div>
            </div>
         </FormContainer>
         <Box>
            <div className="file">
               <HeaderContainer>
                  <div>
                     <h4>Выдача результатов</h4>
                     <span>Вы можете:</span>
                  </div>
                  <div className="buttonsBox">
                     {showButton && (
                        <Button className="closeBtn" onClick={handleClose}>
                           <RemoveIcon />
                           Закрыть результаты
                        </Button>
                     )}
                     {showButton && (
                        <Button onClick={handleSavePDF}>
                           <SortDescIcon />
                           PDF
                        </Button>
                     )}
                     {showButton && (
                        <Button onClick={handlePrint}>
                           <PrinterIcon />
                           Распечатать
                        </Button>
                     )}
                  </div>
               </HeaderContainer>
               <ul ref={pdfRef}>
                  <li>
                     Просмотреть свои результаты анализов онлайн Вы можете,
                     введя в поле слева индивидуальный цифровой код, который
                     указан в верхней части Вашей квитанции под штрих-кодом;
                  </li>

                  <li>
                     Распечатать результат можно непосредсвенно с этой страницы
                     или сохранить в PDF формате с помощью кнопок, расположенной
                     в верхней части сайта;
                  </li>
                  <li className="liRed">
                     При возникновении проблем с отображением результатов, Вы
                     можете оставить заявку на получение результатов по
                     электронной почте, позвонив в Службу поддержки клиентов по
                     номеру 909 090
                  </li>
               </ul>

               <div className="resultpaper">
                  {showButton && (
                     <object
                        data={result.pdgFileCheque}
                        title="submit"
                        type="application/pdf"
                        width="900px"
                        height="590px"
                     >
                        <p>Ваш браузер не поддерживает просмотр PDF.</p>
                     </object>
                  )}
               </div>
            </div>
         </Box>
      </Container>
   )
}

export default GetResult

const Container = styled('div')(() => ({
   background: `url(${Stotoskop})`,
   backgroundSize: 'cover',
   backgroundPositionY: 'center',
   backgroundRepeat: 'no-repeat',
   width: '100%',
   height: '137vh',
   display: 'flex',
   border: '2 solid tertiary-dark-blue',
   zIndex: 1,
}))

const HeaderContainer = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'row',
   justifyContent: 'space-between',
   margin: '1rem 2rem',
   '.buttonsBox': {
      display: 'flex',
      flexDirection: 'row',
      gap: '1rem',
      button: {
         background: ' #3977C0',
         gap: '1rem',
         '&.closeBtn': {
            background: 'red',
         },
      },
   },
}))

const FormContainer = styled('div')(() => ({
   width: '41rem',
   height: '14rem',
   margin: '1.7rem 1.9rem',
   display: 'flex',
   flexDirection: 'column',
   background: '#ffffff',
   gap: '0.9rem',
   alignItems: 'center',
   paddingTop: '0.8rem',
   borderRadius: '10px',
   zIndex: 10,

   '.FormLogo': {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      padding: '1rem 0',
   },
   '.FormInput': {
      div: { display: 'flex', flexDirection: 'row', gap: '1rem' },
   },
}))
const Box = styled('div')(() => ({
   width: '50.1rem',
   height: '137vh',
   display: 'flex',
   borderLeft: '0.625rem solid #3977C0',
   color: '#346EFB',
   '.resultpaper': {
      display: 'flex',
      justifyContent: 'center',
      padding: '7rem 1.5rem',
      p: {
         color: 'red',
         fontSize: '1.5rem',
         marginTop: '12rem',
      },
   },
   '.file': {
      width: '100%',
      height: '33vh',
      background: 'rgba(254, 251, 251, 0.50)',
      backdropFilter: 'blur(156px)',
      opacity: 0.8,
   },
   ul: {
      paddingLeft: '3.2rem',
      fontFamily: 'Manrope',
      fontSize: '0.8rem',
      li: {
         paddingTop: '0.5rem',
         paddingRight: '0.5rem',
         fontSize: '15px',
         fontWeight: '400',
      },
      '.liRed': {
         color: 'red',
      },
   },
}))

const StyledButton = styled(Button)(() => ({
   width: '7rem',
}))
