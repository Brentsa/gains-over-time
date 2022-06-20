import type { NextApiRequest, NextApiResponse } from 'next'
import { Account } from '@prisma/client'
import { prisma } from '../../../db/prisma';
import { getPrismaClientError } from '../../../utils/helpers';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import bcrypt from 'bcrypt';

type Data = Omit<Account, 'password'> | {error: string};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if(req.method !== 'POST') return res.status(405).json({error: 'Incorrect request method.'});

    const {username, email, password} = req.body;

    //hash the supplied password and then run the prisma create operation if no error
    bcrypt.hash(password, 10, async function(err, encrypted){
        if(err) return res.status(400).json({error: 'Account not created.'});

        try{
            //try creating a user with the supplied credentials
            const newAccount: Omit<Account, 'password'> = await prisma.account.create({
                data: {
                    firstName: req.body?.firstName,
                    lastName: req.body?.lastName,
                    username,
                    email,
                    password: encrypted
                },
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    username: true,
                    email: true,
                    createdAt: true
                }
            });

            //If there are no errors, return the account details
            return res.status(200).json(newAccount);
        } 
        catch(e){
            return res.status(400).json({error: 'Account not created. ' + getPrismaClientError(<PrismaClientKnownRequestError>e)});
        }
    }); 
}