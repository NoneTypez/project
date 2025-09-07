import { JSX } from 'react'
import cn from 'classnames'
import styles from './footer.module.css'
import { Box } from '@mui/material'
export default function Footer(): JSX.Element {
  return (
    <Box className={cn(styles.main)}>
      <Box className={cn(styles.leftZone)}>
        <span>TOTAL BALANCE: 10000$</span>
      </Box>
      <Box></Box>
    </Box>
  )
}
