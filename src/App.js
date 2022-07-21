import {useEffect, useState} from 'react'
import {Web3Auth} from '@web3auth/web3auth'
import {OpenloginAdapter} from '@web3auth/openlogin-adapter'
// import Web3 from 'web3'
import './App.css'

const clientId = process.env.REACT_APP_CLIENT_ID // get the clientId from https://dashboard.web3auth.io

function App() {
  const [web3auth, setWeb3auth] = useState(null)
  const [provider, setProvider] = useState(null)

  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId,
          chainConfig: {
            chainNamespace: 'other',
            rpcTarget: 'https://rpc.state-sync-01.theta-testnet.polypore.xyz', // use 'https://rpc.ankr.com/eth' if don't want to use Infura/Ropsten.
          },
        })

        // "other" is supported through @web3auth/openlogin-adapter package.
        const openloginAdapter = new OpenloginAdapter({
          adapterSettings: {
            clientId,
            network: 'testnet',
            uxMode: 'popup',
          },
        })
        web3auth.configureAdapter(openloginAdapter)

        setWeb3auth(web3auth)

        await web3auth.initModal()
      } catch (error) {
        console.error(error)
      }
    }

    init()
  }, [])

  const login = async () => {
    if (!web3auth) {
      uiConsole('web3auth not initialized yet')
      return
    }
    const web3authProvider = await web3auth.connect()
    setProvider(web3authProvider)
  }

  const getUserInfo = async () => {
    if (!web3auth) {
      uiConsole('web3auth not initialized yet')
      return
    }
    const user = await web3auth.getUserInfo()
    // console.log(JSON.stringify(user, null, 2))
    uiConsole(user)
  }

  const logout = async () => {
    if (!web3auth) {
      uiConsole('web3auth not initialized yet')
      return
    }
    await web3auth.logout()
    setProvider(null)
  }

  const getPrivateKey = async () => {
    if (!provider) {
      uiConsole('provider not initialized yet')
      return
    }
    const privateKey = await provider.request({method: 'private_key'})
    uiConsole(privateKey)
  }

  const getAccounts = async () => {
    if (!provider) {
      uiConsole('provider not initialized yet')
      return
    }
    // use chain specific method to get accounts
    uiConsole('use chain specific method to get accounts')
  }

  const getBalance = async () => {
    if (!provider) {
      uiConsole('provider not initialized yet')
      return
    }
    // use chain specific method to get balance
    uiConsole('use chain specific method to get balance')
  }

  const signMessage = async () => {
    if (!provider) {
      uiConsole('provider not initialized yet')
      return
    }
    // use chain specific method to sign message
    uiConsole('use chain specific method to sign message')
  }

  const sendTransaction = async () => {
    if (!provider) {
      uiConsole('provider not initialized yet')
      return
    }
    // use chain specific method to send transaction
    uiConsole('use chain specific method to send transaction')
  }

  function uiConsole(...args) {
    const el = document.querySelector('#console>p')
    if (el) {
      el.innerHTML = JSON.stringify(args || {}, null, 2)
    }
  }

  const loggedInView = (
    <>
      <div className="flex-container">
        <div>
          <button onClick={getPrivateKey} className="card">
            Get Private Key
          </button>
        </div>
        <div>
          <button onClick={getUserInfo} className="card">
            Get User Info
          </button>
        </div>
        <div>
          <button onClick={getAccounts} className="card">
            Get Accounts
          </button>
        </div>
        <div>
          <button onClick={getBalance} className="card">
            Get Balance
          </button>
        </div>
        <div>
          <button onClick={signMessage} className="card">
            Sign Message
          </button>
        </div>
        <div>
          <button onClick={sendTransaction} className="card">
            Send Transaction
          </button>
        </div>
        <div>
          <button onClick={logout} className="card">
            Log Out
          </button>
        </div>
      </div>

      <div id="console" style={{whiteSpace: 'pre-line'}}>
        <p style={{whiteSpace: 'pre-line'}}></p>
      </div>
    </>
  )

  const unloggedInView = (
    <button onClick={login} className="card">
      Login
    </button>
  )

  return (
    <div className="container">
      <h1 className="title">
        <a target="_blank" href="http://web3auth.io/" rel="noreferrer">
          Web3Auth
        </a>{' '}
        & ReactJS Example using Ethereum
      </h1>

      <div className="grid">{provider ? loggedInView : unloggedInView}</div>

      <footer className="footer">
        <a
          href="https://github.com/shahbaz17/web3auth-otherchain-react-demo"
          target="_blank"
          rel="noopener noreferrer"
        >
          Source code
        </a>
      </footer>
    </div>
  )
}

export default App
