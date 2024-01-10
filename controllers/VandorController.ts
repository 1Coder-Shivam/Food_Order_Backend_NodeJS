import { Request, Response, NextFunction } from "express";
import { CreateFoodInputs, UpdateVandorInput, VandorLoginInputs } from "../dto";
import { FindVandor } from "./AdminController";
import { GenerateSignature, ValidatePassword } from "../utility";
import { Food } from "../models";

export const VandorLogin = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = <VandorLoginInputs>req.body;

    const existingVandor = await FindVandor('', email);

    if (existingVandor !== null) {
        //validation
        const validation = await ValidatePassword(password, existingVandor.password, existingVandor.salt);
        if (validation) {

            const signature = GenerateSignature({
                _id: existingVandor.id,
                email: existingVandor.email,
                name: existingVandor.name,
                foodType: existingVandor.foodType
            })

            return res.json(signature);
        } else {
            return res.status(401).json({
                message: "Invalid password"
            })
        }

    }
    return res.status(404).json({
        message: "Vandor not found"
    })


}

export const GetVandorProfile = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (user) {
        const existingVandor = await FindVandor(user._id);
        return res.json(existingVandor);
    }

    return res.status(404).json({
        message: "Vandor not found"
    });
}

export const UpdateVandorProfile = async (req: Request, res: Response, next: NextFunction) => {
    const { name, address, phone, foodType } = <UpdateVandorInput>req.body;
    const user = req.user;
    if (user) {
        const existingVandor = await FindVandor(user._id);
        if (existingVandor !== null) {
            existingVandor.name = name;
            existingVandor.address = address;
            existingVandor.phone = phone;
            existingVandor.foodType = foodType;
            const updatedUser = await existingVandor.save();
            // console.log(updatedUser);
            return res.json(updatedUser);

        }
        return res.json(existingVandor);
    }

    return res.status(404).json({
        message: "Vandor not found"
    });

}
export const UpdateVandorCoverImage = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (user) {
        
        const vandor = await FindVandor(user._id);
        if (vandor !== null) {
            const files = req.files as [Express.Multer.File];
            const images = files.map((file: Express.Multer.File) => file.filename);
            vandor.coverImage.push(...images);
            const result = await vandor.save();
            return res.json(result);
        }
    }

    return res.status(404).json({
        message: "Something went wrong with adding food"
    });

}

export const UpdateVandorService = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (user) {
        const existingVandor = await FindVandor(user._id);
        if (existingVandor !== null) {
            existingVandor.serviceAvailable = !existingVandor.serviceAvailable;
            const updatedUser = await existingVandor.save();
            // console.log(updatedUser);
            return res.json(updatedUser);

        }
        return res.json(existingVandor);
    }

    return res.status(404).json({
        message: "Vandor not found"
    });

}

export const AddFood = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (user) {
        const { name, description, category, foodType, readyTime, price } = <CreateFoodInputs>req.body;
        const vandor = await FindVandor(user._id);
        if (vandor !== null) {
            const files = req.files as [Express.Multer.File];
            const images = files.map((file: Express.Multer.File) => file.filename);
            const createdFood = await Food.create({
                vandorId: vandor.id,
                name: name,
                description: description,
                category: category,
                foodType: foodType,
                readyTime: readyTime,
                images: images,
                price: price,
                rating: 0
            })

            vandor.foods.push(createdFood);
            const result = await vandor.save();
            return res.json(result);
        }
    }

    return res.status(404).json({
        message: "Something went wrong with adding food"
    });

}

export const GetFoods = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (user) {
        const foods = await Food.find({ vandorId: user._id });
        if (foods !== null) {
            return res.json(foods);
        }
    }

    return res.status(404).json({
        message: "something went wrong with getting food"
    });

}