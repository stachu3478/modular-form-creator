import { styled } from 'styled-components'
import { useState } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { IconButton } from './design-system/components/IconButton'
import { Drawer } from './design-system/components/Drawer'

function App() {
  const [isNavOpen, setNavOpen] = useState(false)

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
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/resources">Resources</Link>
            </li>
          </NavList>
        </nav>
      </Drawer>
    </AppShell>
  )
}

const AppShell = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const Topbar = styled.header`
  height: 64px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 16px;
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.raised};
`

const Title = styled.h1`
  font-size: 1rem;
  margin: 0;
`

const Main = styled.main`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
`

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 8px;

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
  }
`

export default App
