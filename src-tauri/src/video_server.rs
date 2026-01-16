use axum::{
    extract::{Path, Request},
    http::StatusCode,
    response::{IntoResponse, Response},
    routing::get,
    Router,
};
use std::{net::SocketAddr, path::PathBuf};
use tower::ServiceExt;
use tower_http::services::ServeFile;
use tower_http::cors::CorsLayer;

pub struct VideoServerState {
    pub port: u16,
}

pub struct VideoServer;

impl VideoServer {
    pub async fn start(port: u16) -> Result<u16, Box<dyn std::error::Error + Send + Sync>> {
        let app = Router::new()
            .route("/video/*path", get(serve_video))
            .layer(CorsLayer::permissive());

        let addr = SocketAddr::from(([127, 0, 0, 1], port));
        let listener = tokio::net::TcpListener::bind(addr).await?;
        let actual_port = listener.local_addr()?.port();

        log::info!("video server started on port {}", actual_port);

        tokio::spawn(async move {
            axum::serve(listener, app).await.ok();
        });

        Ok(actual_port)
    }
}

async fn serve_video(Path(path): Path<String>, req: Request) -> Result<Response, StatusCode> {
    let decoded_path = match urlencoding::decode(&path) {
        Ok(p) => p.into_owned(),
        Err(_) => return Err(StatusCode::BAD_REQUEST),
    };

    let range_header = req.headers()
        .get("range")
        .and_then(|h| h.to_str().ok())
        .unwrap_or("none");
        
    log::info!("request: {} | range: {}", decoded_path, range_header);

    let file_path = PathBuf::from(format!("/{}", decoded_path));
    
    if !file_path.exists() {
         log::error!("not found: {:?}", file_path);
         return Err(StatusCode::NOT_FOUND);
    }
    
    let service = ServeFile::new(file_path);
    
    match service.oneshot(req).await {
        Ok(res) => {
            // log::info!("response status: {}", res.status());
            Ok(res.into_response())
        },
        Err(e) => {
            log::error!("serve error: {}", e);
            Err(StatusCode::INTERNAL_SERVER_ERROR)
        },
    }
}

#[tauri::command]
pub async fn get_video_server_port(
    state: tauri::State<'_, VideoServerState>,
) -> Result<u16, String> {
    Ok(state.port)
}
