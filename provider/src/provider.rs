use crate::constants::BASE;
use blake3::Hasher as Blake3;
use hashwires::hashwires::{Commitment, Proof};
use num_bigint::BigUint;

pub fn verify_proof_and_commitment(
    commitment_bytes: Vec<u8>,
    proof_bytes: Vec<u8>,
    threshold: BigUint,
) -> bool {
    match Proof::deserialize(&proof_bytes) {
        Ok(proof) => {
            match Commitment::<Blake3>::deserialize(&commitment_bytes, BASE)
                .verify(&proof, &threshold)
            {
                Ok(_) => true,
                Err(_e) => false,
            }
        }
        Err(_e) => false,
    }
}
