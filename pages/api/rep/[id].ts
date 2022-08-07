import type { NextApiRequest, NextApiResponse } from "next";
import { Rep } from "@prisma/client";
import { prisma } from '../../../db/prisma';

type Data = Rep | {error: string}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>){
    if(req.method !== 'GET') return res.status(405).json({error: 'Incorrect request method.'});

    //destructure the id from the request query
    const {id} = req.query;

    //find a rep with the queried ID
    const rep = await prisma.rep.findUnique({
        where: {
            id: parseInt(<string>id)
        }
    })

    //if a rep isn't found with the supplied ID, return an error
    if(!rep) return res.status(400).json({error: 'Rep not found.'});

    return res.status(200).json(rep);
}