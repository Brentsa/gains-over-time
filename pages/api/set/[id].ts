import type { NextApiRequest, NextApiResponse } from "next";
import { Set } from "@prisma/client";
import { prisma } from '../../../db/prisma';

type Data = Set | {error: string}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>){
    if(req.method !== 'GET') return res.status(405).json({error: 'Incorrect request method.'});

    //destructure the set id from the request query
    const {id} = req.query

    //find the set witht he supplied ID and include the associated reps
    const set = await prisma.set.findUnique({
        where: {
            id: parseInt(<string>id)
        }
    })

    //if the set isn't found with the supplied id return an error response 
    if(!set) return res.status(400).json({error: 'Set not found.'});

    return res.status(200).json(set);
}