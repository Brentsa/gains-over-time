import type { NextApiRequest, NextApiResponse } from 'next'
import { Account } from '@prisma/client'
import { prisma } from '../../../db/prisma';

type Data = Account | {error: string};

export default async function handler(req: NextApiRequest, res:NextApiResponse<Data>){
    if(req.method !== 'GET') return res.status(405).json({error: 'Incorrect request method.'});

    const {username} = req.query;

    //Store the account with the queried username
    const account = await prisma.account.findUnique({
        where: {
            username: <string>username
        }
    })

    //Return an error message if no account is found with the supplied username
    if(!account) return res.status(400).json({error: 'Account not found.'});

    return res.status(200).json(account);
}