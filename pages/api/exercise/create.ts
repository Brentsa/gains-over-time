import type { NextApiRequest, NextApiResponse } from 'next'
import { Exercise } from '@prisma/client'
import { prisma } from '../../../db/prisma';
import { getPrismaClientError } from '../../../utils/helpers';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

type Data = Exercise | {error: string};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>){
    if(req.method !== 'POST') return res.status(405).json({error: 'Incorrect request method.'});

    const {exerciseTId, accountId} = req.body;

    try{
        //try creating a new muscle and connect muscles to the muscle db table
        const newExercise = await prisma.exercise.create({
            data: {
                exerciseTId,
                accountId
            }
        })

        return res.status(200).json(newExercise);
    }
    catch(e){
        console.log(e);
        return res.status(400).json({error: 'Muscle not created. ' + getPrismaClientError(<PrismaClientKnownRequestError>e)});
    }
}