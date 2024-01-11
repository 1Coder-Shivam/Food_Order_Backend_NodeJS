import express, {Request, Response, NextFunction } from 'express'
import { Vandor } from '../models';

export const GetFoodAvailability = async (req: Request, res: Response, next: NextFunction)=>{
    const pincode = req.params.pincode;
    const result = await Vandor.find({pincode: pincode})
    .sort([['rating','descending']])
    .populate('foods')

    if(result.length>0){
        return res.status(200).json(result);
    }

    return res.status(404).json({
        message: "No restaurants found"
    })
}

export const GetTopRestaurants = async (req: Request, res: Response, next: NextFunction)=>{

}

export const GetFastFoods = async (req: Request, res: Response, next: NextFunction)=>{

}

export const SearchFoods = async (req: Request, res: Response, next: NextFunction)=>{

}

export const RestaurantById = async (req: Request, res: Response, next: NextFunction)=>{

}
