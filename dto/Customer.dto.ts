import { IsEmail, IsEmpty, Length } from "class-validator";

export class CreateCustomerInputs{

    @IsEmail()
    email: string;

    @Length(8,16)
    password: string;

    @Length(8,16)
    phone : string;
}