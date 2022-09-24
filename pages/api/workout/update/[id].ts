import { Workout, ExerciseTemplate } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../../../db/prisma';
import { getPrismaClientError } from '../../../../utils/helpers';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

type Data = Workout | {error: string}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>){
    if(req.method !== 'PUT') return res.status(405).json({error: 'Incorrect request method.'});

    const {id} = req.query;

    //if exercises are given in the request body, format them into an object array for prisma to handle
    const exerciseTemplateIds: number[] | undefined = req.body?.exercises;
    const exerciseTemplates: ExerciseTemplate[] | undefined = exerciseTemplateIds ? exerciseTemplateIds.map(etId => <ExerciseTemplate>{id: etId}) : undefined; 

    try{
        const deletedWorkout = await prisma.workout.update({
            where: {
                id: parseInt(<string>id)
            },
            data: exerciseTemplates ? {...req.body, exercises: {set: exerciseTemplates}} : {...req.body},
            include: {
                exercises: {
                    select: {
                        id: true,
                        name: true,
                        targetSets: true, 
                        targetReps: true,
                        type: true
                    }
                },
                account: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        username: true,
                        email: true
                    }
                }
            }
        })

        return res.status(200).json(deletedWorkout);
    }
    catch(e){
        return res.status(400).json({error: 'Workout not updated. ' + getPrismaClientError(<PrismaClientKnownRequestError>e)});
    }
}