import type { NextApiRequest, NextApiResponse } from 'next'
import { Account } from '@prisma/client';
import { prisma } from '../../../db/prisma';
import { isEmail, getPrismaClientError  } from '../../../utils/helpers';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../../utils/iron-session-config";
import bcrypt from 'bcrypt';

type Data = {success: string, account: Omit<Account, 'password' | 'createdAt'>} | {error: string};
type FindArgument = {where: {email: string} | {username: string}};

export default withIronSessionApiRoute(handler, ironOptions);

async function handler(req: NextApiRequest, res: NextApiResponse<Data>){
    if(req.method !== "POST") return res.status(405).json({error: 'Incorrect request method.'})

    //destructure the account username and password from the request body
    const {username, password} = req.body;

    //check if the supplied username is an email or actual username to define the account search parameter for prisma
    const findArgument: FindArgument = {where: isEmail(username) ? {email: username} : {username: username}};

    try{
        //try to find the account using the supplied username or email, return error if account isn't found
        const account = await prisma.account.findUnique(findArgument);
        if(!account) return res.status(401).json({error: 'Incorrect credentials used.'})

        //once account is found, check if the supplied password matches the account password in the db
        const passwordMatch = await bcrypt.compare(password, account.password);
        if(!passwordMatch) return res.status(401).json({error: 'Incorrect credentials used.'})

        //create an account data object to save in the session
        const accountData = {
            id: account.id,
            username: account.username,
            firstName: account.firstName,
            lastName: account.lastName,
            email: account.email
        }

        //once authenticated, save the iron session data in a cookie
        req.session.user = accountData;
        await req.session.save();

        //return a success message with filtered account data
        return res.status(200).json({success: "Successfully logged in.", account: accountData});
    }
    catch(e){
        return res.status(400).json({error: 'Account not created. ' + getPrismaClientError(<PrismaClientKnownRequestError>e)});
    }
}