interface ISideBarIcons {
  dashboard: string
  exchange: string
  projects: string
  scripts: string
  swap: string
  other: string
  table: string
  log: string
  search: string
  arrow_down: string
  arrow_up: string
}

interface IHeadersValues {
  id: number
  profileName: string
  email: string
  twitter: string
  discord: string
  telegram: string
  telephone: string
  github: string
  balance?: string | undefined
}

export type { ISideBarIcons, IHeadersValues }
