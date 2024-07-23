import { Router } from "express";
import {  getUserNotifications,
    getUserNotification,
    createUserNotification,
    updateUserNotification,
     deleteUserNotification 
    } from "../controllers/notifications-controllers.js";
const router = Router()


router.get('/:id/notifications',getUserNotifications)
router.get('/notifications/:notification_id',getUserNotification)
router.post('/:id/notifications',createUserNotification)
router.put('/notifications/:notification_id',updateUserNotification)
router.delete('/notifications/:notification_id',deleteUserNotification)


export default router