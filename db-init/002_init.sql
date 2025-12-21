-- Databse for user audio inputs
CREATE TABLE IF NOT EXISTS audio_submissions (
    id SERIAL PRIMARY KEY,
    file_path TEXT NOT NULL,
    mime_type TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT now()
);