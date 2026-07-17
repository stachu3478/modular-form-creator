export const capitalize = (str: string) => str[0].toUpperCase() + str.slice(1)

export function debounce<T>(fn: (...args: T[]) => void, delay = 3000): typeof fn {
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  return function (this: object, ...args: T[]) {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
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
