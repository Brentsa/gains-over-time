import type { NextApiRequest, NextApiResponse } from 'next'
import { Muscle, ExerciseTemplate } from '@prisma/client'
import { prisma } from '../../../db/prisma';
import { getPrismaClientError } from '../../../utils/helpers';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

type Data = ExerciseTemplate | {error: string};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>){
    if(req.method !== 'POST') return res.status(405).json({error: 'Incorrect request method.'});

    const {name, accountId, targetReps, targetSets, type} = req.body;

    //if there is a muscles array in the request, map the array of ids to a muscle id array for prisma [{id: 1},{id: 2},...]
    const muscleIds: number[] = req.body.muscles ?? [];
    const muscles: Muscle[] = muscleIds.map(muscleId => <Muscle>{id: muscleId});

    try{
        const newExerciseTemplate = await prisma.exerciseTemplate.create({
            data: {
                name,
                accountId,
                muscles: {
                    connect: muscles
                },
                targetReps,
                targetSets,
                type
            }
        })

        res.status(200).json(newExerciseTemplate);
    }
    catch(e){
        return res.status(400).json({error: 'Exercise template not created. ' + getPrismaClientError(<PrismaClientKnownRequestError>e)});
    }
}