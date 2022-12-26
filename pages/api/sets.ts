import type { NextApiRequest, NextApiResponse } from "next";
import { Set } from "@prisma/client";
import { prisma } from '../../db/prisma';

type Data = Set[] | {error: string};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>){
    if(req.method !== 'GET') return res.status(405).json({error: 'Incorrect request method.'});

    //find all sets in the database
    const allSets = await prisma.set.findMany();

    return res.status(200).json(allSets);
}