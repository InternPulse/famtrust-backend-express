import express from 'express';
import * as dotenv from 'dotenv';
import { pool } from './database/config/db.config.js';
 import notificationsRoutes from './routes/notifications-routes.js' 
import settingsRoutes from './routes//setttings-routes.js' 

dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 4000;

 
// Test database connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.log('Error connecting to the database', err);
  } else {
    console.log('Connected to database successfully');
  }
});

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use('/api/v1/user-notifications',notificationsRoutes)
app.use('/api/v1/user-settings',settingsRoutes)

app.get("/", async (req, res) => {
  res.json({ msg: `Server Live on port ${PORT}` });
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

 

process.on('SIGINT', () => {
  pool.end(() => {
    console.log('Database pool closed');
    process.exit(0);
  });
});
