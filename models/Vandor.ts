import mongoose, { Schema, Document, Model } from "mongoose";

interface VandorDoc extends Document {
    name: string;
    ownerName: string;
    foodType: [string];
    pincode: string;
    address: string;
    phone: string;
    email: string;
    password: string;
    salt: string;
    serviceAvailable: Boolean;
    coverImage: [string];
    rating: number;
    foods: any;

}

const VandorSchema = new Schema({
    name: { type: String, required: true },
    ownerName: { type: String, required: true },
    foodType: [{ type: String, required: true }],
    pincode: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    serviceAvailable: { type: Boolean, required: true },
    coverImage: [{ type: String, required: true }],
    rating: { type: Number, required: true },
    foods: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Food" }]
},
    {
        toJSON: {
            transform: (doc, ret, options) => {
                delete ret.password;
                delete ret.salt;
                delete ret.__v;
                delete ret.createdAt;
                delete ret.updatedAt;
            }
        },
        timestamps: true
    });

const Vandor = mongoose.model<VandorDoc>("Vandor", VandorSchema);

export {Vandor}