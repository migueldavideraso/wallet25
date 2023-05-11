
import MuiBackdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import { useState } from 'react'


export default function useBackDrop () {

  const [open, setOpen] = useState(false);

  const closeBackdrop = () => {
    setOpen(false);
  };

  const openBackdrop = () => {
    setOpen(true);
  };


  const Backdrop = () => (
    <MuiBackdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <CircularProgress color="inherit" />
    </MuiBackdrop>
  )

  return {
    Backdrop,
    closeBackdrop,
    openBackdrop,
  }
}