CREATE TABLE users(
    uniq_id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    id text UNIQUE,
    password text
);

CREATE TABLE files(
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    file_name text,
    format varchar(16),
    mime_type varchar(32),
    storage varchar(16),
    upload_date DATE NOT NULL DEFAULT CURRENT_DATE
);
CREATE TABLE expired_tokens(
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    token text
);