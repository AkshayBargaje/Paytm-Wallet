"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function p2pTransfer( to :String,amount:number){
    const session = await getServerSession(authOptions);
    const from  = session.user?.id;
    if(!from){
        return {
            message:"Error while sending"
        }
    }

    const toUser = await prisma.user.findFirst({
        where:{
            number:to.toString()
        }
    });

    if (!toUser) {
        return {
            message: "User not found"
        }
    }

    await prisma.$transaction(async (tx) => {
        //locking the row such that no one can update/read it 
        await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`;
        //in mongo db if transaction is done another transaction is parralley done then it will revert automatically

        const fromBalance = await tx.balance.findUnique({
            where: { userId: Number(from) },
          });
          if (!fromBalance || fromBalance.amount < amount) {
            console.log("Insufficient funds");
            // throw new Error('Insufficient funds');
          }
        //   await new Promise(r => setTimeout(r, 4000));
          await tx.balance.update({
            where: { userId: Number(from) },
            data: { amount: { decrement: amount } },
          });

          await tx.balance.update({
            where: { userId: toUser.id },
            data: { amount: { increment: amount } },
          });


            await tx.p2pTransfer.create({
                data:{
                    amount: amount,
                    timestamp: new Date().toISOString(),
                    fromUserId:Number(from),
                    toUserId: toUser.id
                }
            })

    });
}