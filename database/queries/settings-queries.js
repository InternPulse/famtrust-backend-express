const getSettings = 'SELECT * FROM settings WHERE id = $1'
const checkUserExists = 'SELECT COUNT(*) FROM users WHERE id = $1 ' ;
const existingSettings = 'SELECT * FROM settings WHERE settings_id = $1 '
const createSettings = 'INSERT INTO settings (id, notifications_enabled, theme, language, profile_visibility, data_sharing) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';


const deleteBySettings = 'DELETE FROM settings WHERE settings_id = $1 RETURNING *'

// for UPDATE
const updateBySettings = 'UPDATE settings SET notifications_enabled = $1, theme = $2, language = $3, profile_visibility = $4, data_sharing = $5, updated_at = CURRENT_TIMESTAMP WHERE  settings_id = $6 RETURNING *'


export {
  getSettings,
  checkUserExists,
  existingSettings,
  createSettings,
  deleteBySettings,
  updateBySettings
};