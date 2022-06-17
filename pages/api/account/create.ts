import type { NextApiRequest, NextApiResponse } from 'next'
import { Account, Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

type Data = Omit<Account, 'password'> | {error: string};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if(req.method !== 'POST') return res.status(405).json({error: 'Incorrect request method.'});

    const {username, password, email} = req.body;

    try{
        //try creating a user with the supplied credentials
        const newAccount: Omit<Account, 'password'> = await prisma.account.create({
            data: {
                firstName: req.body?.firstName,
                lastName: req.body?.lastName,
                username,
                password,
                email
            },
            //return all account fields but password
            select: {
                id: true,
                firstName: true,
                lastName: true,
                username: true,
                email: true,
                createdAt: true
            }
        })

        //If there are no errors, return the account details
        return res.status(200).json(newAccount);
    }
    catch(e){
        //default error message
        let error: string = 'Account not created.'

        //if the error is a prisma known error, try to give more information in the error
        if(e instanceof Prisma.PrismaClientKnownRequestError){
            switch(e.code){
                case 'P2002':
                    error = 'Account not created. Unique constraint violation.'
                    break;
            }
        }

        //return an error object with the message
        return res.status(400).json({error});
    }
}