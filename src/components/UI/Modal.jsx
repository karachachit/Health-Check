import { Box } from '@mui/material'
import MuiModal from '@mui/material/Modal'

const Modal = ({
   children,
   open,
   onClose,
   bgcolor = '#FFFFFF',
   width,
   height,
   padding = '30px 20px',
   borderRadius = '16px',
   ...rest
}) => {
   const style = {
      width: { width },
      height: { height },
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      padding: { padding },
      borderRadius: { borderRadius },
      backgroundColor: bgcolor === 'blue' ? '#EBF2FC' : '#FFFFFF',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      '&:focus-visible': {
         outline: '0',
      },
   }

   return (
      <MuiModal
         open={open}
         onClose={onClose}
         aria-labelledby="modal-modal-title"
         aria-describedby="modal-modal-description"
         {...rest}
      >
         <Box sx={style}>{children}</Box>
      </MuiModal>
   )
}

export default Modal
