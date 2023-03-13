CREATE TABLE users(
    uniq_id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    id text UNIQUE,
    password text
);