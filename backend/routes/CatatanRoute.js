import express from "express";
import { 
    getCatatan, 
    getCatatanById,
    createCatatan,
    updateCatatan,
    deleteCatatan
} from "../controller/CatatanController.js";

const router = express.Router();

router.get('/catatan', getCatatan);
router.get('/catatan/:id', getCatatanById);
router.post('/catatan', createCatatan);
router.patch('/catatan/:id', updateCatatan);
router.delete('/catatan/:id', deleteCatatan);

export default router;