import { mnemonicToAccount } from 'viem/accounts'

const acc = 'anger unaware solution scan walnut lunch jar waste much provide pistol boss'

console.log(mnemonicToAccount(acc).address)
