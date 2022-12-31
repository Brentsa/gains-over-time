import { Prisma } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime"

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August","September", "October", "November", "December"];
const COLORS = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];

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
export function capitalizeFirstChar(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

//capitalize the first letter of each word in a string
export function capitalizeAllWords(string: string): string {

    //Assign a new string with the very first character capitalized
    let newString = capitalizeFirstChar(string);

    //if a space is found in the string, capitalize the next letter
    for(let i = 1; i < newString.length - 1; i++){
        if(newString.charAt(i) === ' '){
            newString = newString.substring(0, i + 1) + newString.charAt(i + 1).toUpperCase() + newString.substring(i + 2);
        }
    }

    return newString;
}

//format a given date string in this format Day String 
export function formatDateFullString(dateString: string): string {
    const date = new Date(dateString);
    return `${WEEKDAYS[date.getDay()]}, ${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

export function formatDateNumerical(dateString: string): string {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

//return tailwind text color class dependand on the supplied weekday
export function getWeekdayColor(dateString: string): string {
    const date = new Date(dateString);
    return COLORS[date.getDay()];
}

//calculate the average value from an array of numbers
export function calculateAverage(numbers: number[]): number {
    return numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0) / numbers.length;
}