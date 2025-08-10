import { ElementType, JSX, useState } from 'react'
import { IconButton, List, ListItemButton, ListItemText, Paper } from '@mui/material'

export type SubMenuItem = {
  label: string
  onClick: () => void
}

export type SideBarButtonProps = {
  icon: ElementType
  subMenu?: SubMenuItem[]
}

export default function SideBarButton({ icon: Icon, subMenu }: SideBarButtonProps): JSX.Element {
  const [open, setOpen] = useState(false)

  const mainIconStyle = {
    fontSize: '40px',
    color: '#515151ff',
    transition: 'color 0.2s ease',
    '&:hover': {
      color: '#a2a9acff'
    }
  }

  return (
    <div
      style={{ position: 'relative' }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <IconButton>
        <Icon sx={mainIconStyle} />
      </IconButton>

      {subMenu && open && (
        <Paper
          elevation={3}
          sx={{
            cursor: 'default',
            position: 'absolute',
            left: '100%',
            top: 0,
            bgcolor: 'background.paper',
            minWidth: 180,
            zIndex: 1000
          }}
        >
          <List>
            {subMenu.map((item, i) => (
              <ListItemButton key={i} onClick={item.onClick} sx={{ padding: '8px 16px' }}>
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
          </List>
        </Paper>
      )}
    </div>
  )
}
