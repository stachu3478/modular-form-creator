export const fetchFromApi: typeof fetch = (path, ...opts) => {
  const url = `${import.meta.env.VITE_API_URL}/api${path}`
  console.log('Fetching', url, opts)
  return fetch(url, ...opts)
}
