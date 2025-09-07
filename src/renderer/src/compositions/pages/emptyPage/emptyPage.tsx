import cn from 'classnames'
import styles from './emptyPage.module.css'
import { JSX } from 'react'
import { Box, Typography } from '@mui/material'

interface EmptyPageProps {
  text?: string
}

export default function EmptyPage({
  text = 'There is nothing here yet ...'
}: EmptyPageProps): JSX.Element {
  return (
    <Box className={cn(styles.main)}>
      <Typography fontSize="20px">{text}</Typography>
    </Box>
  )
}
