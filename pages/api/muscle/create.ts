import type { NextApiRequest, NextApiResponse } from 'next'
import { Muscle } from '@prisma/client'
import { prisma } from '../../../db/prisma';
import { getPrismaClientError } from '../../../utils/helpers';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

type Data = Muscle | {error: string};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if(req.method !== 'POST') return res.status(405).json({error: 'Incorrect request method.'});

    try{
        //try creating a new muscle group with the supplied name
        const newMuscle = await prisma.muscle.create({
            data: {
                name: req.body.name
            }
        })
    
        return res.status(200).json(newMuscle);
    }
    catch(e){
        return res.status(400).json({error: 'Muscle not created. ' + getPrismaClientError(<PrismaClientKnownRequestError>e)});
    }
}