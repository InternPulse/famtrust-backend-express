import { pool } from "../database/config/db.config.js" 
import { getNotifications,checkUserExists,existingNotification, createNotification,deleteByNotification,updateByNotification } from "../database/queries/notification-queries.js";


const getUserNotifications = async (req, res) => {
         const {id} =  req.params 
        
       
         pool.query(checkUserExists, [id], (error, results) => {
            if (error) {
              console.error('Error checking for existing user:', error);
              return res.status(500).json({ message: 'An error occurred while checking for existing user' });
            }
          
            
            // Check if no rows were returned
            if (results.rows.length === 0) {
              return res.status(404).json({ message: 'User not found' });
            }
          
            // Proceed to fetch notifications if user exists
            pool.query(getNotifications, [id], (error, results) => {
              if (error) {
                console.error('Error fetching notifications:', error);
                return res.status(500).json({ message: 'An error occurred while fetching notifications' });
              }
          
              res.status(200).json({ "user notifications": results.rows });
            });
          });
          
    }
  

    const getUserNotification = async(req,res)=>{
        const { notification_id } = req.params

pool.query(existingNotification,[notification_id],(error,results)=>{
    if (error) {
        console.error('Error checking for existing user:', error);
        return res.status(500).json({ message: 'An error occurred while checking for existing user' });
      }
      
      
      if (results.rows.length === 0) {
        return res.status(404).json({ message: 'Notification not found' });
      }



      res.status(200).json({ "single user notification": results.rows });
    })



    }


    
    const createUserNotification = async (req, res) => {
        const { id } = req.params; // User ID
        const { title, message, type } = req.body;
    
        // Validate input
        if (!title || !message || !type) {
            return res.status(400).json({ mssg: 'Please provide a notification title, type, and message' });
        }
    
        try {
            // Check if the user exists
            const userCheckResult = await pool.query('SELECT 1 FROM Users WHERE id = $1', [id]);
    
            if (userCheckResult.rows.length === 0) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            // Create the notification
         
            const result = await pool.query(createNotification, [id, title, message, type]);
            
            res.status(201).json({
                mssg: 'Notification created successfully!',
                "new notification": result.rows[0]
            });
    
        } catch (error) {
            console.error('Error creating new notification:', error);
            res.status(500).json({ mssg: 'An error occurred while creating new notification' });
        }
    };
    
    

const updateUserNotification = async (req,res)=>{
    const { notification_id } = req.params;  


const { title, message, type  } = req.body;

if (!title && !message && !type ) {
    return res.status(400).json({ mssg: 'Please provide at least one field to update (title, message, or type )' });
  }


pool.query(existingNotification,[notification_id],(error,results)=>{
    
    if (error) {
        console.error('Error checking for existing notification:', error);
        return res.status(500).json({ mssg: 'An error occurred while checking for existing notification' });
    }

    const noNotification = !results.rows.length

    if(noNotification){
        return res.status(500).json({ mssg: 'Record does not exist in the database' });

    }

    const existingNotificationValue = results.rows[0];

    const updatedTitle = title || existingNotificationValue.title;
    const updatedMessage = message || existingNotificationValue.message;
    const updatedType = type || existingNotificationValue.type;
 


pool.query(updateByNotification,[updatedTitle, updatedMessage, updatedType,notification_id],(error,results)=>{


if (error) {
console.error('Error creating new user:', error);
return res.status(500).json({ mssg: 'An error occurred while updating user notification' });
}
res.status(200).json({ mssg: 'Record updated successfully!', "notification": results.rows[0] });
})


})


}


const deleteUserNotification = async (req,res)=>{
    const { notification_id } = req.params;  

//delete notification
pool.query(deleteByNotification,[notification_id],(error,results)=>{

    const noNotification = !results.rows.length

    if(noNotification){
        return res.status(500).json({ mssg: 'Record does not exist in the database' });

    }

    if (error) {
        console.error('Error :', error);
        return res.status(500).json({ mssg: 'An error occurred while deleting notification' });
    }
    res.status(201).json({ mssg: 'Record Deleted successfully!' });
})
}


export {
    getUserNotifications,
    getUserNotification,
    createUserNotification,
    updateUserNotification,
    deleteUserNotification
}