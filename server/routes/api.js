import { Router } from "express";
import { getRoot, getFolders } from "../controllers/filesystem.js";

const router = Router()

router.get('/api/filesystem/', getRoot)
router.get('/api/filesystem/:id', getFolders)


export default router