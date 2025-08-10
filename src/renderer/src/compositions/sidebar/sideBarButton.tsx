import { ElementType, JSX, useState } from 'react'
import { Box, IconButton, List, ListItemButton, ListItemText } from '@mui/material'
import { Link } from 'react-router-dom'

export type SubMenuItem = {
  button: string
  path: string
}

export type SideBarButtonProps = {
  icon: ElementType
  subMenu?: SubMenuItem[]
}

export default function SideBarButton({ icon: Icon, subMenu }: SideBarButtonProps): JSX.Element {
  const [visible, setVisible] = useState(false)

  const mainIconStyle = {
    fontSize: '40px',
    color: visible ? '#a2a9acff' : '#515151ff',
    transition: 'color 0.2s ease'
  }

  return (
    <Box
      sx={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <IconButton sx={{ padding: 0.6 }}>
        <Icon sx={mainIconStyle} />
      </IconButton>

      {subMenu && (
        <Box
          sx={{
            position: 'absolute',
            left: '100%',
            top: 0,
            minWidth: 150,
            zIndex: 9999,
            backgroundColor: '#fff',
            borderRadius: '8px',
            overflow: 'hidden',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(-10px)',
            pointerEvents: visible ? 'auto' : 'none',
            transition: 'opacity 0.3s ease, transform 0.3s ease',
            background: '#2a272a',
            color: '#a2a9acff',
            boxShadow: '6px 4px 14px 0px rgba(0,0,0,0.75)'
          }}
        >
          <List sx={{ padding: 0, boxShadow: '27px 14px 32px 0px rgba(0,0,0,0.75)' }}>
            {subMenu.map((item, i) => (
              <ListItemButton
                key={i}
                component={Link}
                to={item.path}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  borderRadius: 3,
                  ':hover': { color: '#dad8d8ff', background: '#2f2f2fff' }
                }}
              >
                <ListItemText primary={item.button} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      )}
    </Box>
  )
}
