import type { NextApiRequest, NextApiResponse } from 'next'
import { Set } from '@prisma/client'
import { prisma } from '../../../db/prisma';
import { getPrismaClientError } from '../../../utils/helpers';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

type Data = Set | {error: string};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>){
    if(req.method !== 'POST') return res.status(405).json({error: 'Incorrect request method'});

    //destructure the exercise ID from the request body
    const {exerciseId, quantity, weight} = req.body;

    try{
        //use prisma to create a new exercise in the db
        const newExercise = await prisma.set.create({
            data: {
               exerciseId,
               quantity,
               weight
            }
        })

        //if ther are no errors return the exercise
        return res.status(200).json(newExercise);
    }
    catch(e){
        return res.status(400).json({error: 'Set not created. ' + getPrismaClientError(<PrismaClientKnownRequestError>e)})
    }
}