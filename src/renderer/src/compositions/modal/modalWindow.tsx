import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { Fade } from '@mui/material'
import { JSX } from 'react'

interface IModalWindow {
  open: boolean
  onClose: () => void
  style?: object
  children: JSX.Element
}

function ModalWindow({ open, onClose, children }: IModalWindow): JSX.Element {
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Fade in={open} timeout={400}>
        <Box
          sx={{
            // ...style,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            bgcolor: '#2a272a',
            borderRadius: '10px',
            boxShadow: 24,
            height: 700,
            width: 800
          }}
        >
          {/* Заголовок с крестиком */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              padding: 1
            }}
          >
            <IconButton
              aria-label="close"
              onClick={onClose}
              sx={{
                color: '#929292ff' // или другой цвет
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          {children}
        </Box>
      </Fade>
    </Modal>
  )
}

export default ModalWindow
