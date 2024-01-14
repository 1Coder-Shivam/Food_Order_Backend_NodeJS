import express, {Request, Response, NextFunction } from 'express'
import { FoodDoc, Vandor } from '../models';

export const GetFoodAvailability = async (req: Request, res: Response, next: NextFunction)=>{
    const pincode = req.params.pincode;
    const result = await Vandor.find({pincode: pincode, serviceAvailable: false})
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
    const pincode = req.params.pincode;
    const result = await Vandor.find({pincode: pincode, serviceAvailable: false})
    .sort([['rating','descending']])
    .limit(1)

    if(result.length>0){
        return res.status(200).json(result);
    }

    return res.status(404).json({
        message: "No restaurants found"
    })
}

export const GetFastFoods = async (req: Request, res: Response, next: NextFunction)=>{
    const pincode = req.params.pincode;
    const result = await Vandor.find({pincode: pincode, serviceAvailable: false})
    .populate('foods')

    if(result.length>0){
        let foodResult: any = []
        result.map((vandor)=>{
            const foods = vandor.foods as [FoodDoc]
            
            foodResult.push(...foods.filter(food=> food.readyTime<=30));

        })
        return res.status(200).json(foodResult);
    }

    return res.status(404).json({
        message: "No Data found"
    })
}

export const SearchFoods = async (req: Request, res: Response, next: NextFunction)=>{
    const pincode = req.params.pincode;
    const result = await Vandor.find({pincode: pincode, serviceAvailable: false})
    .populate('foods')

    if(result.length>0){
        let foodResult: any = []
        result.map(item => foodResult.push(...item.foods) )
        return res.status(200).json(foodResult);
    }

    return res.status(404).json({
        message: "No Data found"
    })
}

export const RestaurantById = async (req: Request, res: Response, next: NextFunction)=>{
    const id = req.params.id;
    const result = await Vandor.findById(id).populate('foods')
    

    if(result){
        return res.status(200).json(result);
    }

    return res.status(404).json({
        message: "No restaurants found"
    })
}
