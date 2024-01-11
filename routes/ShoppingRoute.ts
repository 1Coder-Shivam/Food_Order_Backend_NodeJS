import express, { Request, Response, NextFunction } from 'express'
import { GetFastFoods, GetFoodAvailability, GetTopRestaurants, RestaurantById, SearchFoods } from '../controllers';

const router = express.Router();

//Food Availability
router.get('/:pincode',GetFoodAvailability)

//Top Restaurants
router.get('/top-restaurants/:pincode',GetTopRestaurants)

//Foods Avaiable in 30 minutes
router.get('/fast-foods/:pincode',GetFastFoods)

// Search Foods
router.get('/search/:pincode', SearchFoods)

//Find Restaurants
router.get('/restaurants/:id',RestaurantById)


export { router as ShoppingRoute }