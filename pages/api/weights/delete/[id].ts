import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../db/prisma';
import { Weight } from '@prisma/client';
import { getPrismaClientError } from '../../../../utils/helpers';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

type Data = Weight | {error: string};

export default async function handler(req:NextApiRequest, res:NextApiResponse<Data>){
    if(req.method !== 'DELETE') return res.status(405).json({error: 'Incorrect request method.'});

    //destructure the account ID from the request query
    const {id} = req.query;

    try{
        //delete the weight record using the supplied weight id
        const deletedWeight = await prisma.weight.delete({
            where: {
                id: parseInt(id as string)
            }
        })
        
        return res.status(200).json(deletedWeight);    
    }
    catch(e){
        return res.status(400).json({error: 'Weight record could not be deleted. Error: ' + getPrismaClientError(<PrismaClientKnownRequestError>e)});
    }
}
