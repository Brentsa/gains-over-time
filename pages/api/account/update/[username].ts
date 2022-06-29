import type { NextApiRequest, NextApiResponse } from 'next'
import { Account } from '@prisma/client'
import { prisma } from '../../../../db/prisma';
import { getPrismaClientError } from '../../../../utils/helpers';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

type Data = Omit<Account, 'password'> | {error: string}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>){
    if(req.method !== 'PUT') return res.status(405).json({error: 'Incorrect request method.'});

    const {username} = req.query

    try{
        //try updating the account with the supplied username and return the account minus the password
        const updatedAccount: Omit<Account, 'password'> = await prisma.account.update({
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
        return res.status(400).json({error: 'Account not updated. ' + getPrismaClientError(<PrismaClientKnownRequestError>e)});
    }
}