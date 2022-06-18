import type { NextApiRequest, NextApiResponse } from 'next'
import { Account, Prisma } from '@prisma/client'
import { prisma } from '../../../../db/prisma';

type Data = Omit<Account, 'password'> | {error: string}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>){
    if(req.method !== 'PUT') return res.status(405).json({error: 'Incorrect request method.'});

    const {username} = req.query

    try{
        //try updating the account with the supplied username and return the account minus the password
        const updatedAccount = await prisma.account.update({
            where: {
                username: <string>username 
            },
            data: {
                ...req.body
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                username: true,
                email: true,
                createdAt: true
            }
        })
    
        return res.status(200).json(updatedAccount);
    }
    catch(e){
        //instantiate general error
        let error: string = "Account not updated."

        //check error code and if found, specify the message
        if(e instanceof Prisma.PrismaClientKnownRequestError){
            console.log(e.message, e.code);
            switch(e.code){
                case 'P2002':
                    console.log(e.message);
                    error = 'Account not updated. Unique constraint violation.'
                    break;
                case 'P2025': 
                    console.log(e.message);
                    error = 'Account not updated. Account not found.'
                    break;
            }
        }

        //return 400 code and the error
        return res.status(400).json({error})
    }
}