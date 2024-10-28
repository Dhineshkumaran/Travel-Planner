import express from 'express';
import { 
    createTour, 
    deleteTour, 
    getSingleTour, 
    updateTour, 
    getAllTour, 
    getTourBySearch, 
    getFeaturedTour, 
    getTourCount 
} from '../Controllers/tourControllers.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

// Create new tour 
router.post('/', createTour);
router.put("/:id", updateTour);
router.delete("/:id", deleteTour);
router.get("/:id", getSingleTour);
router.get('/', getAllTour);
router.get("/search/getTourBySearch", getTourBySearch);
router.get("/search/getFeaturedTour", getFeaturedTour); // This route will now filter by category
router.get("/search/getTourCount", getTourCount);

export default router;
