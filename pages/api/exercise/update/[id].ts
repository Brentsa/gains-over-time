import type { NextApiRequest, NextApiResponse } from 'next'
import { Exercise } from '@prisma/client'
import { prisma } from '../../../../db/prisma';
import { getPrismaClientError } from '../../../../utils/helpers';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

type Data = Exercise | {error: string}
type Sets = {id: number};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>){
    if(req.method !== 'PUT') return res.status(405).json({error: 'Incorrect request method.'});

    const { id } = req.query;

    //if there is a muscles array in the request, map the array of ids to a muscle id array for prisma [{id: 1},{id: 2},...]
    // const muscleIds: number[] | undefined = req.body?.muscles;
    // const muscles:Muscle[] | undefined = muscleIds ? muscleIds.map(muscleId => <Muscle>{id: muscleId}) : undefined;

    const setIds: number[] | undefined = req.body.sets;
    const sets: Sets[] | undefined = setIds ? setIds.map(setId => <Sets>{id: setId}): undefined;

    try{
        const updatedExercise = await prisma.exercise.update({
            where: {
                id: parseInt(<string>id)
            },
            data:{
                sets: {
                    set: sets
                }
                // muscles: {
                //     set: muscles
                // }
            },
            include: {
                account: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        username: true
                    }
                }
            }
        })
    
        return res.status(200).json(updatedExercise);
    }
    catch(e){
        return res.status(400).json({error: 'Exercise not updated. ' + getPrismaClientError(<PrismaClientKnownRequestError>e)});
    }
}