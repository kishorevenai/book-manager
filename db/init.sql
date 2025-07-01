-- Create roles table
CREATE TABLE IF NOT EXISTS roles (
  role_id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL
);

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  user_id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role_id INTEGER REFERENCES roles(role_id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create books table
CREATE TABLE IF NOT EXISTS books (
  book_id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(100),
  published_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create user_books table
CREATE TABLE IF NOT EXISTS user_books (
  user_id INTEGER NOT NULL,
  book_id INTEGER NOT NULL,
  assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, book_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (book_id) REFERENCES books(book_id) ON DELETE CASCADE
);

-- Insert roles
INSERT INTO roles (name) VALUES ('admin'), ('member')
ON CONFLICT DO NOTHING;

-- Insert users
INSERT INTO users (name, email, password, role_id)
VALUES 
  ('Admin User', 'admin@example.com', 'hashedpassword1', 1),
  ('Member User', 'member@example.com', 'hashedpassword2', 2)
ON CONFLICT DO NOTHING;

-- Insert books
INSERT INTO books (title, author, published_date)
VALUES
  ('The Pragmatic Programmer', 'Andrew Hunt', '1999-10-20'),
  ('Clean Code', 'Robert C. Martin', '2008-08-01'),
  ('You Don’t Know JS', 'Kyle Simpson', '2014-12-27')
ON CONFLICT DO NOTHING;

-- Assign books to users
INSERT INTO user_books (user_id, book_id)
VALUES
  (1, 1),
  (1, 2),
  (2, 3)
ON CONFLICT DO NOTHING;
