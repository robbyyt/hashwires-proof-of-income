
import axios, {AxiosError} from 'axios';
import { TAccount } from "../context/account";
import { IssuerException, ProviderException } from '../exception';

const ISSUER_API_ENDPOINT = import.meta.env.VITE_ISSUER_API_ENDPOINT;
const PROVIDER_API_ENDPOINT = import.meta.env.VITE_PROVIDER_API_ENDPOINT;

const getIncomeProof = async (account: TAccount, threshold: number) => {
  try {
    return (await axios.post<{ commitment: number[], proof: number[] }>(`${ISSUER_API_ENDPOINT}/${account.toLowerCase()}`, { threshold })).data
  } catch(err) {
    if(err instanceof AxiosError) {
      if(err.status === 502) throw new IssuerException('Threshold too high for proof.')
      else {
        throw new IssuerException(err.message);
      }
    }
    throw new IssuerException('Unknown error');
  }
}

const verifyProof = async (commitment: number[], proof: number[], threshold: number) => {
  try {
    const proofResult = (await axios.post<{"is_valid": boolean}>(PROVIDER_API_ENDPOINT, { commitment, proof, threshold })).data
    if(proofResult.is_valid !== true) throw new ProviderException('Invalid proof of income!')
  } catch(err) {
    if(err instanceof AxiosError) {
      throw new ProviderException(err.message);
    }
    throw new ProviderException('Unknown error')
  }
}


export const applyForPlan = async (account: TAccount, threshold: number) => {
  const {commitment, proof} = await getIncomeProof(account, threshold);
  await verifyProof(commitment,proof, threshold);
}