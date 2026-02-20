-- ================================================
-- Bus Board - Supabase Database Setup
-- Run this in the Supabase SQL Editor (Step 5)
-- ================================================

-- Create the buses table
CREATE TABLE buses (
  id SERIAL PRIMARY KEY,
  bus_number INTEGER NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'arrived',
  updated_date TEXT NOT NULL DEFAULT TO_CHAR(CURRENT_DATE, 'YYYY-MM-DD')
);

-- Insert the 12 buses
INSERT INTO buses (bus_number) VALUES
  (1), (2), (3), (4), (5), (6),
  (7), (8), (9), (10), (11), (12);

-- Allow anyone with the site URL to read and update bus status
ALTER TABLE buses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read" ON buses
  FOR SELECT USING (true);

CREATE POLICY "Allow public update" ON buses
  FOR UPDATE USING (true) WITH CHECK (true);

-- Enable real-time updates so all devices sync instantly
ALTER PUBLICATION supabase_realtime ADD TABLE buses;
