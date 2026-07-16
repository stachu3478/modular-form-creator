import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import App from '../App'
import { GlobalStyles } from '../design-system/theme/GlobalStyles'
import { theme } from '../design-system/theme/theme'

describe('navigation drawer', () => {
  it('opens the drawer and navigates to /resources', async () => {
    const router = createMemoryRouter(
      [
        {
          path: '/',
          element: <App />,
          children: [
            { index: true, element: <h1>Home</h1> },
            { path: 'resources', element: <h1>Resources</h1> },
          ],
        },
      ],
      { initialEntries: ['/'] }
    )

    render(
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <RouterProvider router={router} />
      </ThemeProvider>
    )

    fireEvent.click(screen.getByRole('button', { name: /open navigation/i }))
    fireEvent.click(screen.getByRole('link', { name: /resources/i }))

    expect(await screen.findByRole('heading', { name: /resources/i })).toBeInTheDocument()
    expect(router.state.location.pathname).toBe('/resources')
  })
})
