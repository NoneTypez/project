import { JSX } from 'react'

type LogoProps = {
  src: string
  alt?: string
}

function Logo({ src, alt = 'Logo' }: LogoProps): JSX.Element {
  return (
    <span>
      <img className="logo" src={src} alt={alt} />
    </span>
  )
}

export default Logo
