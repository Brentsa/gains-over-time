import type { NextApiRequest, NextApiResponse } from 'next'
import { Rep } from '@prisma/client'
import { prisma } from '../../../db/prisma';
import { getPrismaClientError } from '../../../utils/helpers';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

type Data = Rep | {error: string};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>){
    if(req.method !== 'POST') return res.status(405).json({error: 'Incorrect request method'});

    //Destructure the weight, quantity, and setId from the request body
    const {weight, quantity, setId} = req.body;

    try{
        //try creating a new rep asynchronously
        const newRep = await prisma.rep.create({
            data: {
                weight,
                quantity,
                setId
            }
        })

        //if there are no errors return the rep values
        return res.status(200).json(newRep);
    }
    catch(e){
        return res.status(400).json({error: 'Rep not created. ' + getPrismaClientError(<PrismaClientKnownRequestError>e)});
    }
}