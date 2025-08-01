// theme.ts
import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  components: {
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: 'white',
          backgroundColor: '#2a272a',
          borderRadius: '10px',
          padding: '8px',
          '&:hover': {
            backgroundColor: '#3a383e'
          },
          '&:active': {
            backgroundColor: '#4a464f'
          }
        }
      },
      defaultProps: {
        size: 'medium'
      }
    }
  }
})

export default theme
