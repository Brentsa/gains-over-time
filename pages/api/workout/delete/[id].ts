import { Workout } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../../../db/prisma';
import { getPrismaClientError } from '../../../../utils/helpers';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

type Data = Workout | {error: string}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>){
    if(req.method !== 'DELETE') return res.status(405).json({error: 'Incorrect request method.'});

    const {id} = req.query;

    try{
        const deletedWorkout = await prisma.workout.delete({
            where: {
                id: parseInt(<string>id)
            }
        })

        return res.status(200).json(deletedWorkout);
    }
    catch(e){
        return res.status(400).json({error: 'Workout not deleted. ' + getPrismaClientError(<PrismaClientKnownRequestError>e)});
    }
}