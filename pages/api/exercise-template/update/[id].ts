import type { NextApiRequest, NextApiResponse } from 'next'
import { Muscle, ExerciseTemplate } from '@prisma/client'
import { prisma } from '../../../../db/prisma';
import { getPrismaClientError } from '../../../../utils/helpers';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

type Data = ExerciseTemplate | {error: string};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>){
    if(req.method !== 'PUT') return res.status(405).json({error: 'Incorrect request method'});

    const {id} = req.query;

    //if there is a muscles array in the request, format a new array for prisma connecting format
    const muscleIds: number[] | undefined = req.body?.muscles; 
    const muscles: Muscle[] | undefined = muscleIds ? muscleIds.map(muscleId => <Muscle>{id: muscleId}) : undefined;

    try{
        const updatedExerciseTemplate = await prisma.exerciseTemplate.update({
            where: {
                id: parseInt(<string>id)
            },
            data: muscles ? {...req.body, muscles:{set: muscles}} : {...req.body},
            include: {
                muscles: {
                    select: {
                        id: true,
                        name: true
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

        return res.status(200).json(updatedExerciseTemplate);
    }
    catch(e){
        return res.status(400).json({error: 'Exercise template not updated. ' + getPrismaClientError(<PrismaClientKnownRequestError>e)});
    }
}