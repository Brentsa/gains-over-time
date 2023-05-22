import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../db/prisma';
import { Weight } from '@prisma/client';

type Data = Weight[] | {error: string};

export default async function handler(req:NextApiRequest, res:NextApiResponse<Data>){
    if(req.method !== 'GET') return res.status(405).json({error: 'Incorrect request method.'});

    //destructure the account ID from the request query
    const {accountId} = req.query;

    //find all weight records in the database
    const allWeights = await prisma.weight.findMany()
    
    return res.status(200).json(allWeights);
}
