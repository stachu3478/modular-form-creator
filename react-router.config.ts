import type { Config } from '@react-router/dev/config'

export default {
  appDirectory: 'src',
  ssr: true, // FIXME: missing html file for client build
} satisfies Config
