import { useState } from "react"
import Navbar from "./components/layout/Navbar"
import { AccountContext, TAccount } from './context/account.tsx'
import PlanSelect from "./components/ui/PlanSelect/index.tsx";

function App() {
  const [account, setAccount] = useState<TAccount>('Bob');

  return (
    <AccountContext.Provider value={{account, setAccount}}>
        <Navbar />
        <main className="flex justify-center items-center">
          <PlanSelect />
        </main>
    </AccountContext.Provider>

  )
}

export default App
