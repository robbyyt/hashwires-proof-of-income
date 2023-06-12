import { useCallback, useState } from 'react'
import { Tab } from '@headlessui/react'
import { classNames } from '../../../utils/styles'
import { TAccount, useAccountContext } from '../../../context/account'
import { applyForPlan } from '../../../services/plan.service'
import { useError } from '../../../context/error'
import { IssuerException, ProviderException } from '../../../exception'
import SuccessAlert from '../SuccessAlert'

const plans = [
  {
    id: 1,
    title: 'Basic plan',
    threshold: 0,
    description: "No income statement required",
  },
  {
    id: 2,
    title: 'Silver plan',
    threshold: 900,
    description: "Requires an income of at least 900$ monthly",
  },
  {
    id: 3,
    title: 'Gold plan',
    threshold: 1500,
    description: "Requires an income of at least 1500$ monthly",
  },
]

export default function PlanSelect() {
  const { account } = useAccountContext();
  const [success, setSuccess] = useState(false);
  const { setError } = useError();

  const handleApplication = useCallback(async (account: TAccount, threshold: number) => {
    try {
      await applyForPlan(account, threshold);
      setSuccess(true);
    } catch(err) {
      if(err instanceof IssuerException || err instanceof ProviderException) {
        setError(err); 
      } else {
        setError(new Error('Unknown error'));
      }
    }
  }, [setError]);

  return (
    <>
    <div className="w-full max-w-md px-2 py-16 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {plans.map((plan) => (
            <Tab
              key={plan.id}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              {plan.title}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {plans.map((plan) => (
            <Tab.Panel
              key={plan.title}
              className={classNames(
                'flex items-center flex-col',
                'rounded-xl bg-white p-3',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
              )}
            >
              <p>{plan.description}</p>
              {(plan.threshold > 0 && !success) && <button onClick={() => handleApplication(account, plan.threshold)} className='bg-blue-500 mt-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>Apply</button>}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
      <div className='flex flex-col items-center'>
      {success && <SuccessAlert />}
      {success && <button onClick={() => setSuccess(false)} className='bg-red-500 mt-2 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full max-w-[100px]'>Reset</button>}
      </div>
    </div>
    </>
  )
}
