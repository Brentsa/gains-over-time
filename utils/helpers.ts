import { Prisma } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime"

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August","September", "October", "November", "December"];
const SHORT_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug","Sep", "Oct", "Nov", "Dec"];
const COLORS = ["#fecaca", "#fed7aa", "#fef08a", "#d9f99d", "#bfdbfe", "#c7d2fe", "#ddd6fe"];

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

//eg. "January 1, 2022"
export function formatDateFullString(dateString: string): string {
    const date = new Date(dateString);
    return `${WEEKDAYS[date.getDay()]}, ${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

//eg. "01/01/2022"
export function formatDateNumerical(dateString: string): string {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

//eg. "Jan 1"
export function formatDateShort(dateString:string): string {
    const date = new Date(dateString);
    return `${SHORT_MONTHS[date.getMonth()]} ${date.getDate()}`;
}

//eg. "Jan 1, 2022"
export function formatDateShortMonth(dateString:string): string {
    const date = new Date(dateString);
    return `${SHORT_MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

//return tailwind text color class dependand on the supplied weekday
export function getWeekdayColor(dateString: string): string {
    const date = new Date(dateString);
    return COLORS[date.getDay()];
}

//calculate and return the number of days from today
export function daysFromToday(dateString: string): number {
    if(!dateString) return 0;

    let date = new Date(dateString);
    date.setMilliseconds(0);
    date.setSeconds(0);
    date.setMinutes(0);
    date.setHours(0);

    let today = new Date; 
    today.setMilliseconds(0);
    today.setSeconds(0);
    today.setMinutes(0);
    today.setHours(0);

    //determine the absolute value of the ms difference between today and the supplied date
    const dateDiff = Math.abs(today.getTime() - date.getTime()); 
    
    return Math.round(dateDiff / (1000 * 60 * 60 * 24));
}

//calculate the average value from an array of numbers
export function calculateAverage(numbers: number[]): number {
    return numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0)/numbers.length;
}

//calculate the total sum from an array of numbers
export function calculateSum(numbers: number[]): number {
    return numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0); 
}

//take in two date strings and check if they are the same date
export function isSameDate(date1: string, date2: string){
    const d1 = new Date(date1); 
    const d2 = new Date(date2);

    return d1.getDate() === d2.getDate() && d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear()
}

//check if a supplied date is today
export function isToday(date: string){
    const d1 = new Date(date); 
    const d2 = new Date;

    return d1.getDate() === d2.getDate() && d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear()
}