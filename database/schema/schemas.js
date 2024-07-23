import { pool } from "../config/db.config";

const createTablesQuery = `
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS Notifications (
  notification_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  id UUID NOT NULL REFERENCES Users(id),
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  read_at TIMESTAMP,
  type VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS Settings (
  settings_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
   id UUID NOT NULL REFERENCES Users(id),
  notifications_enabled BOOLEAN DEFAULT true,
  theme VARCHAR(50) DEFAULT 'light',
  language VARCHAR(10) DEFAULT 'en',
  profile_visibility VARCHAR(20) DEFAULT 'public',
  data_sharing BOOLEAN DEFAULT true,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;




export const createSchema = async () => {
    console.log('function ran!')
  try {
    await pool.query(createTablesQuery);
    console.log('Tables created successfully');
  } catch (err) {
    console.error('Error creating tables', err);
  } finally {
    await pool.end(); 
  }
};

