import type { NextApiRequest, NextApiResponse } from 'next'
import { Account } from '@prisma/client'
import { prisma } from '../../../../db/prisma';
import { getPrismaClientError } from '../../../../utils/helpers';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from '../../../../utils/iron-session-config';

type Data = Omit<Account, 'password' | 'createdAt'> | {error: string}

export default withIronSessionApiRoute(handler, ironOptions);

async function handler(req: NextApiRequest, res: NextApiResponse<Data>){
    if(req.method !== 'PUT') return res.status(405).json({error: 'Incorrect request method.'});

    const {id} = req.query

    try{
        //try updating the account with the supplied id and return the account minus the password
        const updatedAccount: Omit<Account, 'password' | 'createdAt'> = await prisma.account.update({
            where: {
                id: parseInt(<string>id)
            },
            data: {
                ...req.body
            },
            select: {
                id: true,
                username: true,
                firstName: true,
                lastName: true,
                email: true
            }
        })

        //update the iron session data in a cookie
        req.session.user = updatedAccount;
        await req.session.save();
    
        return res.status(200).json(updatedAccount);
    }
    catch(e){
        return res.status(400).json({error: 'Account not updated. ' + getPrismaClientError(<PrismaClientKnownRequestError>e)});
    }
}