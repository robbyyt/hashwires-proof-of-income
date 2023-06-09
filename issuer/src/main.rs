mod issuer;
use issuer::generate_proof_and_commitment;
use num_bigint::BigUint;
mod constants;

use axum::{
    extract::Path,
    http::StatusCode,
    response::{IntoResponse, Json},
    routing::post,
    Router,
};

use lambda_http::{run, Error};
use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
struct Body {
    threshold: u32,
}

#[derive(Serialize)]
struct Response {
    commitment: Vec<u8>,
    proof: Vec<u8>,
}

#[derive(Serialize)]
struct ErrorResponse {
    error: String,
}

#[derive(Serialize)]
#[serde(untagged)]
enum ApiResponse {
    Ok(Response),
    Error(ErrorResponse),
}

async fn issue_income(
    Path(name): Path<String>,
    Json(Body { threshold }): Json<Body>,
) -> impl IntoResponse {
    if name != "bob" || name != "alice" {
        let error_response = ErrorResponse {
            error: "Name must be bob or alice".to_string(),
        };
        return (
            StatusCode::BAD_REQUEST,
            Json(ApiResponse::Error(error_response)),
        );
    }
    if threshold > 0 {
        let threshold = BigUint::from(900u32);
        let (commitment_bytes, proof_bytes) = generate_proof_and_commitment(1000, &threshold);
        let response = Response {
            commitment: commitment_bytes,
            proof: proof_bytes,
        };

        return (StatusCode::OK, Json(ApiResponse::Ok(response)));
    } else {
        let error_response = ErrorResponse {
            error: "Threshold must be positive".to_string(),
        };
        return (
            StatusCode::BAD_REQUEST,
            Json(ApiResponse::Error(error_response)),
        );
    }
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

    let app = Router::new().route("/prove/:name", post(issue_income));

    run(app).await
}
