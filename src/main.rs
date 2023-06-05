mod constants;
mod issuer;
use issuer::generate_proof_and_commitment;
mod provider;
use num_bigint::BigUint;
use provider::verify_proof_and_commitment;

fn main() {
    let threshold = BigUint::from(900u32);
    let (commitment_bytes, proof_bytes) = generate_proof_and_commitment(1000, &threshold);
    let result = verify_proof_and_commitment(commitment_bytes, proof_bytes, threshold);

    println!("Result: {}", result);
}
