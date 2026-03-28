-- Initialization schema for Local D1 Testing

DROP TABLE IF EXISTS posts;
CREATE TABLE posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  image TEXT,
  date TEXT NOT NULL,
  categories TEXT,
  translations TEXT,
  created_at INTEGER NOT NULL
);

DROP TABLE IF EXISTS translations;
CREATE TABLE translations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  lang TEXT NOT NULL,
  key TEXT NOT NULL,
  value TEXT NOT NULL,
  created_at INTEGER NOT NULL
);

DROP TABLE IF EXISTS analytics;
CREATE TABLE analytics (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  anonymous_id TEXT NOT NULL,
  event TEXT NOT NULL,
  path TEXT,
  country TEXT,
  browser_name TEXT,
  os_name TEXT,
  device_type TEXT,
  created_at INTEGER NOT NULL
);

-- Seed some essential UI translations for dev
INSERT INTO translations (lang, key, value, created_at) VALUES ('en', 'hero.title_start', 'HANDCRAFTED', strftime('%s', 'now'));
INSERT INTO translations (lang, key, value, created_at) VALUES ('hr', 'hero.title_start', 'RUČNO', strftime('%s', 'now'));
