mod commands;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(
            tauri_plugin_sql::Builder::default()
                .add_migrations("sqlite:michi.db", commands::db::get_migrations())
                .build(),
        )
        .plugin(tauri_plugin_stronghold::Builder::new(|password| {
            use std::hash::{DefaultHasher, Hasher};
            let mut hasher = DefaultHasher::new();
            hasher.write(password.as_bytes());
            let hash = hasher.finish();
            hash.to_le_bytes().to_vec()
        }).build())
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_shell::init())
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
            commands::xp::get_total_xp,
            commands::xp::add_xp,
            commands::xp::get_xp_history,
            commands::xp::get_daily_average,
            commands::xp::get_streak,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
