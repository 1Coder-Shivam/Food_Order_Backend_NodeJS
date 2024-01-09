import e, { Request, Response, NextFunction } from "express";
import { UpdateVandorInput, VandorLoginInputs } from "../dto";
import { FindVandor } from "./AdminController";
import { GenerateSignature, ValidatePassword } from "../utility";

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
    if(user){
        const existingVandor = await FindVandor(user._id);
        return res.json(existingVandor);
    }

    return res.status(404).json({
        message: "Vandor not found"
    });
}

export const UpdateVandorProfile = async (req: Request, res: Response, next: NextFunction) => {
    const {name, address, phone, foodType} = <UpdateVandorInput>req.body;
    const user = req.user;
    if(user){
        const existingVandor = await FindVandor(user._id);
        if(existingVandor!==null){
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

export const UpdateVandorService = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if(user){
        const existingVandor = await FindVandor(user._id);
        if(existingVandor!==null){
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