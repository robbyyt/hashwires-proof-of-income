import { useState } from "react"
import Navbar from "./components/layout/Navbar"
import { AccountContext, TAccount } from './context/account.tsx'

function App() {
  const [account, setAccount] = useState<TAccount>('Bob');

  return (
    <AccountContext.Provider value={{account, setAccount}}>
        <Navbar />
    </AccountContext.Provider>

  )
}

export default App
