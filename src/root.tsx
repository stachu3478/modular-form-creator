import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from 'styled-components'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { GlobalStyles } from './design-system/theme/GlobalStyles'
import { theme } from './design-system/theme/theme'
import App from './App'
import ResourcesRouteView from './routes/resources/index'
import HomeRoute from './routes/home'
import type { Route } from './+types/root'
import { isRouteErrorResponse } from 'react-router'
import { clientAction } from './routes/resources/index.action'
import { clientLoader } from './routes/resources/index.loader'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomeRoute /> },
      { path: 'resources', element: <ResourcesRouteView />, loader: clientLoader, action: clientAction },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
)

// FIXME: ignored by router
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
