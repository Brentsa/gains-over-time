import { Workout } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../../db/prisma';

type Data = Workout | {error: string}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>){
    if(req.method !== 'GET') return res.status(405).json({error: 'Incorrect request method.'});

    const {id} = req.query;

    const workout = await prisma.workout.findUnique({
        where: {
            id: parseInt(<string>id)
        },
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

    if(!workout) return res.status(400).json({error: 'Workout not found.'});

    return res.status(200).json(workout);
}