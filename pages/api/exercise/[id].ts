import { Exercise } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../db/prisma';

type Data = Exercise | {error: string};

export default async function handler(req:NextApiRequest, res:NextApiResponse<Data>){
    if(req.method !== 'GET') return res.status(405).json({error: 'Incorrect request method.'});

    const {id} = req.query;

    //find all exercises and include their related muscles and account holder
    const exercise = await prisma.exercise.findUnique({
        where: {
            id: parseInt(<string>id)
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
    });

    //Return an error message if no exercise is found with the supplied username
    if(!exercise) return res.status(400).json({error: 'Exercise not found.'});

    return res.status(200).json(exercise);
}