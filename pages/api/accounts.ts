import type { NextApiRequest, NextApiResponse } from 'next'
import { Account } from '@prisma/client'
import { prisma } from '../../db/prisma';

type Data = Account[] | {error: string};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if(req.method !== 'GET') return res.status(405).json({error: 'Incorrect request method.'});

    //search for all accounts in the database
    const allAccounts = await prisma.account.findMany();

    return res.status(200).json(allAccounts);
}