-- Seed the services table with the healing services
INSERT INTO services (id, title, duration_minutes, price_cents) VALUES
  ('reiki', 'Reiki Healing', 60, 9000),
  ('meditation', 'Meditation Guidance', 45, 7000),
  ('counseling', 'Spiritual Counseling', 60, 10000)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  duration_minutes = EXCLUDED.duration_minutes,
  price_cents = EXCLUDED.price_cents;
