import mongoose, {Schema, Document} from "mongoose";

interface FoodDoc extends Document {
    vandorId: string;
    name: string;
    description: string;
    category: string;
    foodType: string;
    readyTime: number;
    price: number;
    rating: number;
    images: [string]
}

const FoodSchema = new Schema({
    vandorId: {type: String, required: true},
    name: {type: String, required: true},
    description: {type: String, required: true},
    category: {type: String, required: true},
    foodType: {type: String, required: true},
    readyTime: {type: Number, required: true},
    price: {type: Number, required: true},
    rating: {type: Number, required: true},
    images: [{type: String}]
},
{
    toJSON: {
        transform: (doc, ret, options) => {
            delete ret.__v;
            delete ret.createdAt;
            delete ret.updatedAt;
        }
    },
    timestamps: true
});

const Food = mongoose.model<FoodDoc>("Food", FoodSchema);
export {Food};