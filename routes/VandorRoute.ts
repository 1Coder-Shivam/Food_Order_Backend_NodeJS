import express, {Request, Response, NextFunction } from 'express'
import { AddFood, GetFoods, GetVandorProfile, UpdateVandorProfile, UpdateVandorService, VandorLogin } from '../controllers';
import { Authenticate } from '../middlewares';
import multer from 'multer';


const router = express.Router();


let imageCounter = 1;

const imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images');
    },
    filename: function (req, file, cb) {
        const uniqueFilename = `${imageCounter}_${file.originalname}`;
        imageCounter += 1;
        cb(null, uniqueFilename);
    }
});


const images = multer({storage: imageStorage}).array('images', 10);


router.post('/login', VandorLogin);

router.use(Authenticate);
router.get('/profile',GetVandorProfile);
router.patch('/profile', UpdateVandorProfile);
router.patch('/service', UpdateVandorService);

router.post('/food',images,AddFood);
router.get('/foods',GetFoods);

router.get('/', (req: Request, res: Response, next: NextFunction)=>{
    res.json({message: "Hello from Vandor"})
})

export {router as VandorRoute}