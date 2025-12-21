-- Databse for textual user inputs
CREATE TABLE IF NOT EXISTS text_submissions (
    id SERIAL PRIMARY KEY,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT now()
);