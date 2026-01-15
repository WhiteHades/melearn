#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod scanner;

use tauri_plugin_sql::{Builder as SqlBuilder, Migration, MigrationKind};

fn get_migrations() -> Vec<Migration> {
    vec![
        Migration {
            version: 1,
            description: "create_courses_table",
            sql: "CREATE TABLE IF NOT EXISTS courses (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                path TEXT UNIQUE NOT NULL,
                total_duration INTEGER DEFAULT 0,
                watched_duration INTEGER DEFAULT 0,
                last_accessed TEXT,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP,
                metadata TEXT
            );",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 2,
            description: "create_lessons_table",
            sql: "CREATE TABLE IF NOT EXISTS lessons (
                id TEXT PRIMARY KEY,
                course_id TEXT NOT NULL,
                section_name TEXT,
                name TEXT NOT NULL,
                path TEXT UNIQUE NOT NULL,
                type TEXT CHECK(type IN ('video', 'audio', 'document', 'quiz')),
                duration INTEGER DEFAULT 0,
                watched_time INTEGER DEFAULT 0,
                completed INTEGER DEFAULT 0,
                order_index INTEGER,
                last_position REAL DEFAULT 0,
                FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
            );",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 3,
            description: "create_notes_table",
            sql: "CREATE TABLE IF NOT EXISTS notes (
                id TEXT PRIMARY KEY,
                lesson_id TEXT NOT NULL,
                timestamp REAL NOT NULL,
                text TEXT NOT NULL,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
            );",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 4,
            description: "create_bookmarks_table",
            sql: "CREATE TABLE IF NOT EXISTS bookmarks (
                id TEXT PRIMARY KEY,
                lesson_id TEXT NOT NULL,
                timestamp REAL NOT NULL,
                label TEXT,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
            );",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 5,
            description: "create_settings_table",
            sql: "CREATE TABLE IF NOT EXISTS settings (
                key TEXT PRIMARY KEY,
                value TEXT
            );",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 6,
            description: "create_indexes",
            sql: "CREATE INDEX IF NOT EXISTS idx_lessons_course ON lessons(course_id);
                  CREATE INDEX IF NOT EXISTS idx_notes_lesson ON notes(lesson_id);
                  CREATE INDEX IF NOT EXISTS idx_bookmarks_lesson ON bookmarks(lesson_id);",
            kind: MigrationKind::Up,
        },
    ]
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_mpv::init())
        .plugin(
            SqlBuilder::default()
                .add_migrations("sqlite:melearn.db", get_migrations())
                .build(),
        )
        .setup(|app| {
            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            scanner::scan_folder,
            scanner::get_file_info
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
