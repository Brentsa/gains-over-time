import type { NextApiRequest, NextApiResponse } from 'next'
import { Workout } from '@prisma/client'
import { prisma } from '../../db/prisma';

type Data = Workout[] | {error: string}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if(req.method !== 'GET') return res.status(405).json({error: 'Incorrect request method.'});

    const allWorkouts = await prisma.workout.findMany({
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

    return res.status(200).json(allWorkouts);
}
