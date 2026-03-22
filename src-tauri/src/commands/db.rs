use tauri_plugin_sql::{Migration, MigrationKind};

pub fn get_migrations() -> Vec<Migration> {
    vec![
        Migration {
            version: 1,
            description: "create_initial_tables",
            sql: r#"
                CREATE TABLE IF NOT EXISTS xp_log (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    source TEXT NOT NULL,
                    xp_earned INTEGER NOT NULL,
                    details TEXT,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                );

                CREATE TABLE IF NOT EXISTS user_progress (
                    id INTEGER PRIMARY KEY CHECK (id = 1),
                    total_xp INTEGER DEFAULT 0,
                    current_level TEXT DEFAULT 'N5',
                    current_streak INTEGER DEFAULT 0,
                    last_active_date DATE,
                    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
                );

                INSERT OR IGNORE INTO user_progress (id, total_xp, current_level, current_streak)
                VALUES (1, 0, 'N5', 0);

                CREATE TABLE IF NOT EXISTS immersion_sessions (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    type TEXT NOT NULL,
                    title TEXT NOT NULL,
                    external_id TEXT,
                    cover_url TEXT,
                    duration_minutes INTEGER,
                    episodes_read INTEGER,
                    xp_earned INTEGER NOT NULL,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                );

                CREATE TABLE IF NOT EXISTS drill_sessions (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    mode TEXT NOT NULL,
                    total_questions INTEGER NOT NULL,
                    correct_answers INTEGER NOT NULL,
                    xp_earned INTEGER NOT NULL,
                    duration_seconds INTEGER,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                );

                CREATE TABLE IF NOT EXISTS drill_high_scores (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    mode TEXT NOT NULL,
                    score INTEGER NOT NULL,
                    date DATE NOT NULL,
                    UNIQUE(mode, date)
                );

                CREATE TABLE IF NOT EXISTS saved_words (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    word TEXT NOT NULL,
                    reading TEXT,
                    meaning TEXT,
                    jlpt_level TEXT,
                    context_sentence TEXT,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                );

                CREATE TABLE IF NOT EXISTS settings (
                    key TEXT PRIMARY KEY,
                    value TEXT NOT NULL
                );
            "#,
            kind: MigrationKind::Up,
        },
    ]
}
