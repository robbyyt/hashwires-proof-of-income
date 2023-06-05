// Import the HashWires library
use blake3::Hasher as Blake3;
use hashwires::hashwires::{Commitment, Proof, Secret};
use num_bigint::BigUint;
use rand_core::{OsRng, RngCore};

const BASE: u32 = 16;
const MAX_NUMBER_BITS: usize = 32;

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

    println!("Generated commitment {:?}", commitment_bytes);

    return commitment_bytes;
}

fn generate_proof(secret: &Secret<blake3::Hasher>, threshold: &BigUint) -> Vec<u8> {
    let proof = secret.prove(BASE, MAX_NUMBER_BITS, threshold).unwrap();
    let proof_bytes = proof.serialize();

    println!("Generated proof {:?}", proof_bytes);

    return proof_bytes;
}

fn main() {
    let secret = generate_secret_base16(1000);
    let commitment_bytes = generate_commit_base16(&secret);
    let threshold = BigUint::from(900u32);
    let proof_bytes = generate_proof(&secret, &threshold);

    match Commitment::<Blake3>::deserialize(&commitment_bytes, BASE)
        .verify(&Proof::deserialize(&proof_bytes).unwrap(), &threshold)
    {
        Ok(_) => println!("Success"),
        Err(e) => println!("Operation failed with error: {:?}", e),
    }
}
