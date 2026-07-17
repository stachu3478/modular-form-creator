import { useState } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { IconButton } from './design-system/components/IconButton'
import { Drawer } from './design-system/components/Drawer'
import { Badge } from './design-system'
import { Form } from 'react-router'
import { AppShell, DeleteButton, Main, NavList, Title, Topbar } from './App.styles'

function App() {
  const [isNavOpen, setNavOpen] = useState(false)
  const [deleteConfirmDrawerOpen, setDeleteConfirmDrawerOpen] = useState(false)

  return (
    <AppShell>
      <Topbar>
        <IconButton aria-label="Open navigation" onClick={() => setNavOpen(true)}>
          ☰
        </IconButton>
        <Title>Modular Form Creator</Title>
      </Topbar>

      <Main>
        <Outlet />
      </Main>

      <Drawer title="Navigation" isOpen={isNavOpen} onClose={() => setNavOpen(false)}>
        <nav>
          <NavList>
            <li>
              <Link to="/resources">Resources</Link>
            </li>
            {!import.meta.env.PROD && (
              <li>
                <DeleteButton
                  variant="secondary"
                  onClick={() => setDeleteConfirmDrawerOpen(true)}
                >
                  Clear application data
                </DeleteButton>
              </li>
            )}
          </NavList>
        </nav>
      </Drawer>

      <Drawer
        title="Resource removal confirmation"
        isOpen={deleteConfirmDrawerOpen}
        onClose={() => setDeleteConfirmDrawerOpen(false)}
      >
        <p>Do you want to remove ALL aplication data?</p>
        <Badge variant="warning">This action is irreversible!</Badge>
        <Form action="/admin/database" method="POST">
          <DeleteButton variant="secondary">Clear application data</DeleteButton>
        </Form>
      </Drawer>
    </AppShell>
  )
}

export default App
