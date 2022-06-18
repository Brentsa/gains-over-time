import type { NextApiRequest, NextApiResponse } from 'next'
import { Account, Prisma } from '@prisma/client'
import { prisma } from '../../../../db/prisma';

type Data = Omit<Account, 'password'> | {error: string}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>){
    if(req.method !== 'DELETE') return res.status(405).json({error: 'Incorrect request method.'});

    const {username} = req.query

    try{
        const deletedAccount: Omit<Account, 'password'> = await prisma.account.delete({
            where: {
                username: <string>username
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

        res.status(200).json(deletedAccount)
    }
    catch(e){
        //instantiate general error
        let error: string = "Account not deleted."

        //check error code and if found, specify the message
        if(e instanceof Prisma.PrismaClientKnownRequestError){
            console.log(e.message, e.code);
            switch(e.code){
                case 'P2025': 
                    console.log(e.message);
                    error = 'Account not deleted. Account not found.'
                    break;
            }
        }

        //return 400 code and the error
        return res.status(400).json({error})
    }
}