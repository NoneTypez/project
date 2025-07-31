import { JSX } from 'react'
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon'

type IconProps = {
  path: string
} & SvgIconProps

export default function Icon({ path, ...props }: IconProps): JSX.Element {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      <path
        d={path}
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </SvgIcon>
  )
}
