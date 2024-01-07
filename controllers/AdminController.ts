import { Request, Response, NextFunction } from "express";
import { CreateVandorInput } from "../dto";
import { Vandor } from "../models";
import { GeneratePassword, GenerateSalt } from "../utility";

export const CreateVandor = async (req: Request, res: Response, next: NextFunction) => {
    const {name, address, pincode, foodType,email,password,ownerName,phone} = <CreateVandorInput>req.body;
    // console.log(name, address, pincode, foodType,email,password,ownerName,phone);
    // res.send("Create Vandor");

    const existingVandor = await Vandor.findOne({email: email});
    if(existingVandor){
        return res.status(409).json({
            message: "Vandor already exists"
        })
    }

    //generate a salt

    const salt = await GenerateSalt();
    const userPassword = await GeneratePassword(password, salt);
    //encrypt the password using the salt

    const createdVandor= await Vandor.create({
        name: name,
        address: address,
        pincode: pincode,
        foodType: foodType,
        email: email,
        password: userPassword,
        salt: salt,
        ownerName: ownerName,
        phone: phone,
        rating: 0,
        serviceAvailable: false,
        coverImage: []
    })

    
    return res.json(createdVandor);
}

export const GetVandor = async (req: Request, res: Response, next: NextFunction) => {

}

export const GetVandorByID = async (req: Request, res: Response, next: NextFunction) => {

} 