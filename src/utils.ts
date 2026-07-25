import { useState } from 'react'

export const capitalize = (str: string) => str[0].toUpperCase() + str.slice(1)

export function useDebounce<T extends (...args: never[]) => void>(cb: T, delay = 200) {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>()

  return function (...args) {
    clearTimeout(timeoutId)
    setTimeoutId(setTimeout(() => cb(...args), delay))
  } as T
}

export function formDataToObject(
  data: FormData,
  { checkBoxFields }: { checkBoxFields: string[] } = { checkBoxFields: [] },
) {
  const entries = [...data.entries()]
  return Object.fromEntries(
    entries.map(([k, v]) => {
      if (checkBoxFields.indexOf(k) !== -1) {
        return [k, entries.filter(([ck]) => ck === k).map((kv) => kv[1])]
      }
      return [k, v]
    }),
  )
}

export const fetchFromApi: typeof fetch = (path, ...opts) => {
  const url = `${import.meta.env.VITE_API_URL}/api${path}`
  return fetch(url, ...opts)
}
