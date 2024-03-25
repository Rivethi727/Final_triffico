
import express from 'express';
const router = express.Router();
import   {createPackages, getPackages,getPackageById} from '../controllers/detailController.js';




router.route('/package').post(createPackages);
router.route('/getAll-packages').get(getPackages);
router.route('/getAll-packages/:id').get(getPackageById);

export default router;
