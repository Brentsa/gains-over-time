import type { NextApiRequest, NextApiResponse } from 'next'
import { Exercise } from '@prisma/client'
import { prisma } from '../../../db/prisma';
import { getPrismaClientError } from '../../../utils/helpers';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

type Data = Exercise | {error: string};
type Muscle = {id: number};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>){
    if(req.method !== 'POST') return res.status(405).json({error: 'Incorrect request method.'});

    const {name, accountId} = req.body;

    //if there is a muscles array in the request, map the array of ids to a muscle id array for prisma
    const muscleIds: number[] = req.body.muscles ?? [];
    const muscles:Muscle[] = muscleIds.map(muscleId => <Muscle>{id: muscleId});

    try{
        //try creating a new muscle and connect muscles to the muscle db table
        const newExercise = await prisma.exercise.create({
            data: {
                name,
                accountId,
                muscles: {
                    connect: muscles
                }
            }
        })

        return res.status(200).json(newExercise);
    }
    catch(e){
        return res.status(400).json({error: 'Muscle not created. ' + getPrismaClientError(<PrismaClientKnownRequestError>e)});
    }
}