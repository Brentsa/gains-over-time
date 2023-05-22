import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../db/prisma';
import { Weight } from '@prisma/client';
import { getPrismaClientError } from '../../../utils/helpers';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

type Data = Weight | {error: string};

export default async function handler(req:NextApiRequest, res:NextApiResponse<Data>){
    if(req.method !== 'POST') return res.status(405).json({error: 'Incorrect request method.'});

    //destructure the account ID from the request query
    const {accountId, weight, massUnit} = req.body;

    try{
        //create a new weight record using the supplied, account ID, weight, and mass unit type
        const newWeight = await prisma.weight.create({
            data: {
                accountId,
                weight, 
                massUnit
            }
        })
        
        return res.status(200).json(newWeight);
    }
    catch(e){
        return res.status(400).json({error: 'Weight record could not be created. Error: ' + getPrismaClientError(<PrismaClientKnownRequestError>e)});
    }
}
