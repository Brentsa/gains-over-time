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

    //If there is a sets array in the request, format a new array to connect it with the updated exercise template
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
            },
            include: {
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
    
        return res.status(200).json(updatedExercise);
    }
    catch(e){
        return res.status(400).json({error: 'Exercise not updated. ' + getPrismaClientError(<PrismaClientKnownRequestError>e)});
    }
}