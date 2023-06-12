import { useState } from "react"
import Navbar from "./components/layout/Navbar"
import { AccountContext, TAccount } from './context/account'
import PlanSelect from "./components/ui/PlanSelect/index.tsx";
import { ErrorContext } from "./context/error.ts";
import ErrorDialog from "./components/ui/ErrorDialog/index.tsx";

function App() {
  const [account, setAccount] = useState<TAccount>('Bob');
  const [error, setError] = useState<Error | null>(null);

  return (
    <AccountContext.Provider value={{account, setAccount}}>
      <ErrorContext.Provider value={{error, setError}}>
        <Navbar />
        <main className="flex flex-col justify-center items-center px-2 pt-10">
          <div className="text-center">
          <h1 className="font-black">EasyWire</h1>
          <p>Financial services with privacy out of the box. Apply for one of our plans using by proving your income is above a certain threshold.</p>
          <p>Your sensitive account information does not leave the safety of your bank. No screenshots or bank statements required. Powered by <a target="_blank" href="https://github.com/novifinancial/hashwires" className="text-blue-500 hover:underline">HashWires.</a></p>
          <p>To get started, select an account and pick a plan!</p>
          </div>
          <PlanSelect />
          <div className="text-center">
            <p className="text-gray-500">This implementation is proof of concept. Not meant for production use. See the full source code <a href="https://github.com/robbyyt/hashwires-proof-of-income" target="_blank" className="text-gray-800 hover:underline">here</a></p>
          </div>
        </main>
        <ErrorDialog />
      </ErrorContext.Provider>
    </AccountContext.Provider>

  )
}

export default App
