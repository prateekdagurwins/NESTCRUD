import { IsNotEmpty, IsString } from "class-validator";
import { ObjectId } from "typeorm";



export class objectIdDto {
    @IsString()
    id: ObjectId
}

export class userDto {

    @IsNotEmpty()
    @IsString()
    readonly name: String
    
    @IsNotEmpty()
    @IsString()
    readonly username: String

    @IsNotEmpty()
    @IsString()
    password: String
}


export class userLoginDto {
    @IsNotEmpty()
    @IsString()
    username: String

    @IsNotEmpty()
    @IsString()
    password: String
}

