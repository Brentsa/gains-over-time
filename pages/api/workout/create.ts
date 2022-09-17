import type { NextApiRequest, NextApiResponse } from 'next'
import { ExerciseTemplate, Workout } from '@prisma/client'
import { prisma } from '../../../db/prisma';
import { getPrismaClientError } from '../../../utils/helpers';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

type Data = Workout | {error: string};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if(req.method !== 'POST') return res.status(405).json({error: 'Incorrect request method.'});

    const {name} = req.body;

    const exerciseTemplateIds: number[] | undefined = req.body?.exerciseTemplates;
    const exerciseTemplates: ExerciseTemplate[] | undefined = exerciseTemplateIds ? exerciseTemplateIds.map(etId => <ExerciseTemplate>{id: etId}) : undefined; 

    try{
        const newWorkout = await prisma.workout.create({
            data: {
                name,
                exercises: { connect: exerciseTemplates ?? [] }
            },
            include: {
                exercises: {
                    select: {
                        id: true,
                        name: true,
                    }
                }
            }
        })

        return res.status(200).json(newWorkout);
    }
    catch(e){
        return res.status(400).json({error: 'Workout not created. ' + getPrismaClientError(<PrismaClientKnownRequestError>e)});
    }
}