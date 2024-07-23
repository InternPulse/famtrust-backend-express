const getNotifications = 'SELECT * FROM notifications WHERE id = $1 '
const checkUserExists = 'SELECT COUNT(*) FROM users WHERE id = $1 ' ;
const existingNotification = 'SELECT * FROM notifications WHERE notification_id = $1 '
const createNotification =  ' INSERT INTO notifications (id, title, message, type) VALUES ($1, $2, $3, $4) RETURNING *;'

const deleteByNotification = 'DELETE FROM notifications WHERE notification_id = $1 RETURNING *'

// for UPDATE
const updateByNotification = 'UPDATE notifications SET title = $1, message = $2, type = $3, read_at = NOW() WHERE notification_id = $4 RETURNING *';


export {
  getNotifications,
  checkUserExists,
  existingNotification,
  createNotification,
  deleteByNotification,
  updateByNotification
};