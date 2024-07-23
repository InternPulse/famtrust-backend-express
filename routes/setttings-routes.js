import { Router } from "express";
 import {getUserSettings,
    createUserSetting,
    updateUserSetting,
     deleteUserSetting} from '../controllers/settings-controllers.js'
 
const router = Router()


 router.get('/:id/settings',getUserSettings)
router.post('/:id/settings',createUserSetting)
router.put('/:settings_id/settings',updateUserSetting)
router.delete('/:settings_id/settings',deleteUserSetting)


export default router