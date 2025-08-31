export enum TABLES {
  profiles = 'profiles',
  projects = 'projects',
  fees = 'fees',
  earnings = 'earnings',
  evm_wallets = 'evm_wallets',
  sol_wallets = 'sol_wallets',
  btc_wallets = 'btc_wallets',
  atom_wallets = 'atom_wallets',
  ton_wallets = 'ton_wallets'
}

type IProfile = {
  id?: string
  name: string
  email: string
  twitter: string
  discord: string
  telegram: string
  telephone: string
  github: string
  proxy: string
  evm_seed: string
  sol_seed: string
  btc_seed: string
  atom_seed: string
  ton_seed: string
}

type IWallet = {
  seed: string
  privatekey: string
  address: string
}

export type cacheProfiles = {
  profiles: [IProfile]
}

export enum stmtsForInsert {
  inProfileTable = 'INSERT INTO profiles (name, email, twitter, discord, telegram, telephone, github, proxy, evm_seed, sol_seed, btc_seed, atom_seed, ton_seed) VALUES (@name, @email, @twitter, @discord, @telegram, @telephone, @github, @proxy, @evm_seed, @sol_seed, @btc_seed, @atom_seed, @ton_seed)',
  inEvmWalletTable = 'INSERT INTO evm_wallets (seed, privatekey, address) VALUES (@evm_seed, @evm_privatekey, @evm_address)',
  inSolWalletTable = 'INSERT INTO sol_wallets (seed, privatekey, address) VALUES (@sol_seed, @sol_privatekey, @sol_address)',
  inBtcWalletTable = 'INSERT INTO btc_wallets (seed, privatekey, address) VALUES (@btc_seed, @btc_privatekey, @btc_address)',
  inAtomWalletTable = 'INSERT INTO atom_wallets (seed, privatekey, address) VALUES (@atom_seed, @atom_privatekey, @atom_address)',
  inTonWalletTable = 'INSERT INTO ton_wallets (seed, privatekey, address) VALUES (@ton_seed, @ton_privatekey, @ton_address)'
}

export type { IProfile, IWallet }
