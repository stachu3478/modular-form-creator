import { styled } from 'styled-components'
import { Button } from './design-system'

export const AppShell = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

export const Topbar = styled.header`
  height: 64px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 16px;
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.raised};
`

export const Title = styled.h1`
  font-size: 1rem;
  margin: 0;
`

export const Main = styled.main`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
`

export const NavList = styled.ul`
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

export const DeleteButton = styled(Button)`
  color: ${({ theme }) => theme.colors.warning};
`
