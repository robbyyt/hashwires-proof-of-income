use crate::constants::{BASE, MAX_NUMBER_BITS};
use blake3::Hasher as Blake3;
use hashwires::hashwires::Secret;
use num_bigint::BigUint;
use rand_core::{OsRng, RngCore};

fn generate_secret_base16(value: u32) -> Secret<blake3::Hasher> {
    let income_value: BigUint = BigUint::from(value);

    let mut rng = OsRng;
    let mut seed = [0u8; 32];
    rng.fill_bytes(&mut seed);

    let secret = Secret::<Blake3>::gen(&seed, &income_value);

    return secret;
}

fn generate_commit_base16(secret: &Secret<blake3::Hasher>) -> Vec<u8> {
    let commitment = secret.commit(BASE, MAX_NUMBER_BITS).unwrap();
    let commitment_bytes = commitment.serialize();

    return commitment_bytes;
}

fn generate_proof(secret: &Secret<blake3::Hasher>, threshold: &BigUint) -> Vec<u8> {
    let proof = secret.prove(BASE, MAX_NUMBER_BITS, threshold).unwrap();
    let proof_bytes = proof.serialize();

    return proof_bytes;
}

pub fn generate_proof_and_commitment(value: u32, threshold: &BigUint) -> (Vec<u8>, Vec<u8>) {
    let secret = generate_secret_base16(value);
    let commitment_bytes = generate_commit_base16(&secret);
    let proof_bytes = generate_proof(&secret, &threshold);

    return (commitment_bytes, proof_bytes);
}
