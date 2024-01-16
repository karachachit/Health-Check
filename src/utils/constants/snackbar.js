import { enqueueSnackbar } from 'notistack'

export const notify = (content, type = 'success') => {
   enqueueSnackbar({
      variant: type,
      autoHideDuration: 3000,
      message: content,
      anchorOrigin: {
         vertical: 'top',
         horizontal: 'right',
      },
   })
}
