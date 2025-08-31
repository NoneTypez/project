const PROFILES = `
  CREATE TABLE IF NOT EXISTS 'profiles' (
	'id' integer primary key NOT NULL UNIQUE,
	'name' TEXT NOT NULL,
	'email' TEXT NOT NULL,
	'twitter' TEXT NOT NULL,
	'discord' TEXT NOT NULL,
	'telegram' TEXT NOT NULL,
	'telephone' TEXT NOT NULL,
	'github' TEXT NOT NULL,
  'proxy' TEXT NOT NULL,
  'evm_privatekey' TEXT,
  'sol_privatekey' TEXT,
  'btc_privatekey' TEXT,
  'atom_privatekey' TEXT,
  'ton_privatekey' TEXT
)
`

const EVM_WALLETS = `
  CREATE TABLE IF NOT EXISTS 'evm_wallets' (
	'id' integer primary key NOT NULL UNIQUE,
	'seed' TEXT NOT NULL,
	'privatekey' TEXT NOT NULL,
	'address' TEXT NOT NULL
)
`

const SOL_WALLETS = `
  CREATE TABLE IF NOT EXISTS 'sol_wallets' (
	'id' integer primary key NOT NULL UNIQUE,
	'seed' TEXT NOT NULL,
	'privatekey' TEXT NOT NULL,
	'address' TEXT NOT NULL
)
`

const BTC_WALLETS = `
  CREATE TABLE IF NOT EXISTS 'btc_wallets' (
	'id' integer primary key NOT NULL UNIQUE,
	'seed' TEXT NOT NULL,
	'privatekey' TEXT NOT NULL,
	'address' TEXT NOT NULL
)
`

const ATOM_WALLETS = `
  CREATE TABLE IF NOT EXISTS 'atom_wallets' (
	'id' integer primary key NOT NULL UNIQUE,
	'seed' TEXT NOT NULL,
	'privatekey' TEXT NOT NULL,
	'address' TEXT NOT NULL
)
`

const TON_WALLETS = `
  CREATE TABLE IF NOT EXISTS 'ton_wallets' (
	'id' integer primary key NOT NULL UNIQUE,
	'seed' TEXT NOT NULL,
	'privatekey' TEXT NOT NULL,
	'address' TEXT NOT NULL
)
`

const PROJECTS = `
  CREATE TABLE IF NOT EXISTS 'projects' (
	'project' TEXT NOT NULL UNIQUE
)
`

const FEES = `
  CREATE TABLE IF NOT EXISTS 'fees' (
	'id' integer primary key NOT NULL UNIQUE
)
`

const EARNINGS = `
  CREATE TABLE IF NOT EXISTS 'earnings' (
	'id' integer primary key NOT NULL UNIQUE
)
`

const createTableQueries = [
  PROFILES,
  PROJECTS,
  FEES,
  EARNINGS,
  EVM_WALLETS,
  SOL_WALLETS,
  BTC_WALLETS,
  ATOM_WALLETS,
  TON_WALLETS
]

export { createTableQueries }
