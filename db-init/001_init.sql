CREATE TABLE IF NOT EXISTS form_submissions (
    id SERIAL PRIMARY KEY,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT now()
);