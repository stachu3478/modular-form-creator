export const fetchFromApi: typeof fetch = (path, ...opts) => {
  const url = `${import.meta.env.VITE_API_URL}/api${path}`
  return fetch(url, ...opts)
}
