import { Prisma } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime"

//return a prisma client error message from a supplied error object
export function getPrismaClientError(error:  PrismaClientKnownRequestError): string {
    //instantiate blank string
    let message: string = '';

    //check if the supplied error is a prisma client known error
    if(error instanceof Prisma.PrismaClientKnownRequestError){
        console.log(error.message);
        switch(error.code){
            case 'P2002':
                message = 'Unique constraint violation'
                break;
            case 'P2025': 
                message = 'Account not found.'
                break;
        }
    }
   
    return message;
}