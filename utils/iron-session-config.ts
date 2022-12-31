import { IronSessionOptions } from "iron-session"
import { Account } from "@prisma/client"

export const ironOptions: IronSessionOptions = {
    cookieName: 'Gains-Over-Time',
    password: process.env.IRON_SESSION_PW as string,
    cookieOptions: {
        secure: process.env.NODE_ENV === 'production'
    }
}

//declare the typings of req.session
declare module 'iron-session' {
    interface IronSessionData{
        user? : Omit<Account, 'password' | 'createdAt'>
    }
}