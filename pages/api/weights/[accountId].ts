import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../db/prisma';
import { Weight } from '@prisma/client';

type Data = Weight[] | {error: string};

export default async function handler(req:NextApiRequest, res:NextApiResponse<Data>){
    if(req.method !== 'GET') return res.status(405).json({error: 'Incorrect request method.'});

    //destructure the account ID from the request query
    const {accountId} = req.query;

    //find all weights associated with the supplied account ID
    const allWeights = await prisma.weight.findMany({
        where: {
            accountId: parseInt(accountId as string)
        }
    })
    
    return res.status(200).json(allWeights);
}
