mod constants;
mod provider;
use axum::{
    response::{IntoResponse, Json},
    routing::post,
    Router,
};
use lambda_http::{run, Error};
use num_bigint::BigUint;
use provider::verify_proof_and_commitment;
use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
struct Request {
    commitment: Vec<u8>,
    proof: Vec<u8>,
    threshold: u32,
}

#[derive(Serialize)]
struct Response {
    is_valid: bool,
}

async fn verify_income(
    Json(Request {
        commitment,
        proof,
        threshold,
    }): Json<Request>,
) -> impl IntoResponse {
    let casted_threshold = BigUint::from(threshold);
    let is_valid = verify_proof_and_commitment(commitment, proof, casted_threshold);
    Json(Response { is_valid })
}

#[tokio::main]
async fn main() -> Result<(), Error> {
    // required to enable CloudWatch error logging by the runtime
    tracing_subscriber::fmt()
        .with_max_level(tracing::Level::INFO)
        // disable printing the name of the module in every log line.
        .with_target(false)
        // this needs to be set to false, otherwise ANSI color codes will
        // show up in a confusing manner in CloudWatch logs.
        .with_ansi(false)
        // disabling time is handy because CloudWatch will add the ingestion time.
        .without_time()
        .init();
    let app = Router::new().route("/verify", post(verify_income));
    run(app).await
}
