import { Prisma } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime"

//return a prisma client error message from a supplied error object
export function getPrismaClientError(error:  PrismaClientKnownRequestError): string {
    //instantiate blank string
    let message: string = error.code;

    //check if the supplied error is a prisma client known error
    if(error instanceof Prisma.PrismaClientKnownRequestError){
        switch(error.code){
            case 'P2002':
                message = 'Unique constraint violation'
                break;
            case 'P2003':
                message = 'Foreign key constraint failed on field: ' + error.meta?.field_name;
                break;
            case 'P2025': 
                message = 'Object not found in database.'
                break;
            case 'P2022': 
                message = 'Object not created.' + error.message;
                break;
        }
    }
   
    return message;
}

//Check if a supplied string is an email, returns a bool value
export function isEmail(string: string): boolean {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return string.match(emailRegex) ? true : false;
}

//capitalize first letter of a supplied string
export function firstLetterToUpperCase(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
}