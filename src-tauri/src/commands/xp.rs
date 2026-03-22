use serde::{Deserialize, Serialize};
use tauri::command;

#[derive(Debug, Serialize, Deserialize)]
pub struct XpEntry {
    pub id: i64,
    pub source: String,
    pub xp_earned: i64,
    pub details: Option<String>,
    pub created_at: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct UserProgress {
    pub total_xp: i64,
    pub current_level: String,
    pub current_streak: i64,
    pub last_active_date: Option<String>,
}

/// Get the user's total XP and progress
#[command]
pub async fn get_total_xp() -> Result<UserProgress, String> {
    // Will be wired to SQLite via frontend plugin calls
    Ok(UserProgress {
        total_xp: 0,
        current_level: "N5".to_string(),
        current_streak: 0,
        last_active_date: None,
    })
}

/// Add XP from an activity
#[command]
pub async fn add_xp(
    _source: String,
    xp_earned: i64,
    _details: Option<String>,
) -> Result<i64, String> {
    if xp_earned <= 0 {
        return Err("XP must be positive".to_string());
    }
    Ok(xp_earned)
}

/// Get XP history entries
#[command]
pub async fn get_xp_history(_limit: Option<i64>) -> Result<Vec<XpEntry>, String> {
    Ok(vec![])
}

/// Get the daily average XP over the last N days
#[command]
pub async fn get_daily_average(_days: Option<i64>) -> Result<f64, String> {
    Ok(0.0)
}

/// Get the current study streak
#[command]
pub async fn get_streak() -> Result<i64, String> {
    Ok(0)
}
