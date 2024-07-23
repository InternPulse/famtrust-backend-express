import { pool } from "../database/config/db.config.js" 
import { getSettings,createSettings,checkUserExists,deleteBySettings,existingSettings,updateBySettings } from "../database/queries/settings-queries.js";

const getUserSettings= async(req,res)=>{
    const { id } = req.params;


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
        pool.query(getSettings, [id], (error, results) => {
          if (error) {
            console.error('Error fetching settings:', error);
            return res.status(500).json({ message: 'An error occurred while fetching settings' });
          }
      
          res.status(200).json({ "user setting": results.rows });
        });
      });



}





const createUserSetting = async (req, res) => {
    const { id } = req.params; // User ID
    const { notifications_enabled, theme, language, profile_visibility, data_sharing } = req.body;

    // Validate input
    if (notifications_enabled === undefined || theme === undefined || language === undefined || profile_visibility === undefined || data_sharing === undefined) {
        return res.status(400).json({ mssg: 'Please provide notifications_enabled boolean, theme, language, profile_visibility, and data_sharing boolean' });
    }

    try {
        // Check if the user exists
        const userCheckResult = await pool.query('SELECT 1 FROM users WHERE id = $1', [id]);

        if (userCheckResult.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if settings already exist for the user
        const settingsCheckResult = await pool.query('SELECT 1 FROM settings WHERE id = $1', [id]);

        if (settingsCheckResult.rows.length > 0) {
            return res.status(400).json({ mssg: 'This user already has a setting.' });
        }

        // Create the setting
        const result = await pool.query(createSettings,[id, notifications_enabled, theme, language, profile_visibility, data_sharing]
        );
        
        res.status(201).json({
            mssg: 'Settings created successfully!',
            "setting": result.rows[0]
        });

    } catch (error) {
        console.error('Error creating new setting:', error);
        res.status(500).json({ mssg: 'An error occurred while creating new setting', error: error.message });
    }
}




const updateUserSetting = async (req, res) => {
    const { settings_id } = req.params;
    const { notifications_enabled, theme, language, profile_visibility, data_sharing } = req.body;

    if (notifications_enabled === undefined && !theme && !language && !profile_visibility && data_sharing === undefined) {
        return res.status(400).json({ mssg: 'Please provide at least one field to update (notifications_enabled, theme, language, profile_visibility, or data_sharing)' });
    }

    pool.query(existingSettings, [settings_id], (error, results) => {
        if (error) {
            console.error('Error checking for existing setting:', error);
            return res.status(500).json({ mssg: 'An error occurred while checking for existing setting' });
        }

        const noSetting = !results.rows.length;

        if (noSetting) {
            return res.status(404).json({ mssg: 'Record does not exist in the database' });
        }

        const existingSetting = results.rows[0];

        const updatedNotificationsEnabled = notifications_enabled !== undefined ? notifications_enabled : existingSetting.notifications_enabled;
        const updatedTheme = theme || existingSetting.theme;
        const updatedLanguage = language || existingSetting.language;
        const updatedProfileVisibility = profile_visibility || existingSetting.profile_visibility;
        const updatedDataSharing = data_sharing !== undefined ? data_sharing : existingSetting.data_sharing;

        pool.query(updateBySettings, [updatedNotificationsEnabled, updatedTheme, updatedLanguage, updatedProfileVisibility, updatedDataSharing, settings_id],
            (error, results) => {
                if (error) {
                    console.error('Error updating user setting:', error);
                    return res.status(500).json({ mssg: 'An error occurred while updating user setting' });
                }
                res.status(200).json({ mssg: 'Record updated successfully!', "setting": results.rows[0] });
            }
        );
    });
};


const deleteUserSetting= async(req,res)=>{
    const { settings_id } = req.params;  

//delete notification
pool.query(deleteBySettings,[settings_id],(error,results)=>{

    const noSetting = !results.rows.length

    if(noSetting){
        return res.status(500).json({ mssg: 'Record does not exist in the database' });

    }

    if (error) {
        console.error('Error :', error);
        return res.status(500).json({ mssg: 'An error occurred while deleting setting' });
    }
    res.status(201).json({ mssg: 'Record Deleted successfully!' });
})
}




export {
    getUserSettings,
    createUserSetting,
    updateUserSetting,
     deleteUserSetting
}