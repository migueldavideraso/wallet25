
import { useState, useCallback, useId } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { Button } from '@/components/Main'

interface IAlert {
  title: string
  description?: string
  disagree?: string
  agree?: string
}

export default function useAlert () {

  const alertId = useId()
  const [ open, setOpen ] = useState(false)
  const [ onClose, setOnClose ] = useState<((status: boolean) => void)|null>(null)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = (status: boolean) => {

    setOpen(false)

    if (onClose != null) {
      onClose(status)
    }
  }

  const handleSetOnClose = (onClose: (status: boolean) => void) => {
    setOnClose(() => onClose)
  }

  const Alert = ({ title, description, disagree, agree }: IAlert) => {

    return (
      <Dialog
        open={open}
        // onClose={() => handleClose(false)}
        aria-labelledby={alertId + "-alert-dialog-title"}
        aria-describedby={alertId + "-alert-dialog-description"}
      >
        <DialogTitle id={alertId + "-alert-dialog-title"}>
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id={alertId + "-alert-dialog-description"}>
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)}>
            {disagree || 'Disagree'}
          </Button>
          <Button onClick={() => handleClose(true)} autoFocus>
            {agree || 'Agree'}
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  return {
    Alert,
    handleOpen,
    handleSetOnClose,
  }
}
