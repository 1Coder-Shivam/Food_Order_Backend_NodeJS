import express, {Request, Response, NextFunction } from 'express';
import {plainToClass} from 'class-transformer';
import { validate } from 'class-validator';
import { CreateCustomerInputs } from '../dto/Customer.dto';

export const CustomerSignUp = async (req: Request, res: Response, next: NextFunction) => {
    const customerInputs = plainToClass(CreateCustomerInputs,req.body);
    const inputsError = await validate(customerInputs,{validationError:{target:true}});
    if(inputsError.length > 0){
        return res.status(400).json(inputsError);
    }
    const {email,password,phone} = customerInputs;
}

export const CustomerLogin = async (req: Request, res: Response, next: NextFunction) => {}

export const CustomerVerify = async (req: Request, res: Response, next: NextFunction) => {}

export const RequestOTP = async (req: Request, res: Response, next: NextFunction) => {}

export const CustomerProfile = async (req: Request, res: Response, next: NextFunction) => {}

export const CustomerUpdateProfile = async (req: Request, res: Response, next: NextFunction) => {}
