import express , {Request, Response, NextFunction} from 'express'
import { CustomerLogin, CustomerProfile, CustomerSignUp, CustomerUpdateProfile, CustomerVerify, RequestOTP } from '../controllers';

const router = express.Router();

//1. Create a new customer
router.post('/signup',CustomerSignUp);

//2. Login a customer
router.post('/login',CustomerLogin);

//Authenticating a customer

//3. Verify a customer
router.patch('/verify',CustomerVerify);

//4. OTP/ Requesting OTP
router.get('/otp',RequestOTP);

//5. Get customer profile
router.get('/profile',CustomerProfile);

//6. Update customer profile
router.patch('/profile',CustomerUpdateProfile);


//cart
//order
//payment

export {router as CustomerRoute};