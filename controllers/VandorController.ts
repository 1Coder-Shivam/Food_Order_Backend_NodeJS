import e, { Request, Response, NextFunction } from "express";
import { VandorLoginInputs } from "../dto";
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

export const GetVandorProfile = async (req: Request, res: Response, next: NextFunction) => {}

export const UpdateVandorProfile = async (req: Request, res: Response, next: NextFunction) => {}

export const UpdateVandorService = async (req: Request, res: Response, next: NextFunction) => {}