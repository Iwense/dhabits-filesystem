import { Router } from "express";
import { login, registration, logout, refresh } from "../controllers/authController.js";
import {authMiddleware} from '../middleware/authMiddleware.js'
const router = Router()

router.post('/api/auth/registration', registration)
router.post('/api/auth/login', login)
router.post('/api/auth/logout', logout)
router.get('/api/auth/refresh', refresh)

export default router