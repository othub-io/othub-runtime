// Initialise the page objects to interact with
const connectWalletButton = document.querySelector('.connectWalletButton')
const showAccount = document.querySelector('.showAccount')
const showChainId = document.querySelector('.showChainId')
//const sendButton = document.querySelector('.sendButton');

// Initialise the active account and chain id
let activeAccount
let activeChainId

// Update the account and chain id when user clicks on button
// connectWalletButton.addEventListener('click', () => {
//   getAccount()
//   getChainId()
// })

// sendButton.addEventListener('click', () => {
//     console.log('ere')
//     send();
//   });

//Get the account in the window object
async function getAccount (a) {
  const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
  if (accounts.length === 0) {
    // MetaMask is locked or the user has not connected any accounts
    console.log('Please connect to MetaMask.')
  } else if (accounts[0] !== activeAccount) {
    activeAccount = accounts[0]
  }

  localStorage.removeItem('admin_key')
  localStorage.setItem('admin_key', activeAccount)

  activeChainId = await ethereum.request({ method: 'eth_chainId' })
  console.log(activeChainId)
  localStorage.removeItem('chain_id')
  //if not otp testnet
  if (activeChainId === '0x4fce') {
    chain_id = `Origintrail Parachain Testnet`
  } else if (activeChainId === '0x7fb') {
    chain_id = 'Origintrail Parachain Mainnet'
  } else {
    chain_id = 'error'
  }
  localStorage.setItem('activeChainId', activeChainId)
  localStorage.setItem('chain_id', chain_id)

  if (a) {
    window.location.href = `https://otnode.com/myNodes/settings?admin_key=${activeAccount}`
  } else {
    window.location.reload()
  }
}

// Get the connected network chainId
async function getChainId () {
  activeChainId = await ethereum.request({ method: 'eth_chainId' })
  localStorage.removeItem('chain_id')
  console.log(activeChainId)
  //if not otp testnet
  if (activeChainId === '0x4fce') {
    chain_id = `Origintrail Parachain Testnet`
  } else if (activeChainId === '0x7fb') {
    chain_id = 'Origintrail Parachain Mainnet'
  } else {
    chain_id = 'error'
  }

  localStorage.setItem('activeChainId', activeChainId)
  localStorage.setItem('chain_id', chain_id)
  window.location.reload()
}

async function checkAccount () {
  const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
  if (accounts.length === 0) {
    // MetaMask is locked or the user has not connected any accounts
    console.log('Please connect to MetaMask.')
  } else if (accounts[0] !== activeAccount) {
    activeAccount = accounts[0]
  }

  localStorage.removeItem('admin_key')
  localStorage.setItem('admin_key', activeAccount)

  activeChainId = await ethereum.request({ method: 'eth_chainId' })
  console.log(activeChainId)
  localStorage.removeItem('chain_id')
  //if not otp testnet
  if (activeChainId === '0x4fce') {
    chain_id = `Origintrail Parachain Testnet`
  } else if (activeChainId === '0x7fb') {
    chain_id = 'Origintrail Parachain Mainnet'
  } else {
    chain_id = 'error'
  }
  localStorage.setItem('activeChainId', activeChainId)
  localStorage.setItem('chain_id', chain_id)
}

// Update the selected account and chain id on change
ethereum.on('accountsChanged', getAccount)
ethereum.on('chainChanged', getChainId)
