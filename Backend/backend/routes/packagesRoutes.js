
import express from 'express';
import { getPackages, getPackageById, createPackage, updatePackage, deletePackage } from '../controllers/packagesController.js';



const router = express.Router();

// Routes for packages
router.get('/', getPackages);
router.get('/:id', getPackageById);
router.post('/', createPackage);
router.put('/:id', updatePackage);
router.delete('/:id', deletePackage);

// // Export the router
export default router;
