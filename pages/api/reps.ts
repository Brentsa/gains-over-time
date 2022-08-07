import type { NextApiRequest, NextApiResponse } from "next";
import { Rep } from "@prisma/client";
import { prisma } from '../../db/prisma';

type Data = Rep[] | {error: string};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>){
    if(req.method !== 'GET') return res.status(405).json({error: 'Incorrect request method.'});

    //find all the reps in the database
    const allReps = await prisma.rep.findMany();

    res.status(200).json(allReps);
}