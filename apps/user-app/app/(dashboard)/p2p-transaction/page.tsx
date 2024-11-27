// import { getServerSession } from "next-auth";
// import { SendCard } from "../../../components/SendCard";
// import { p2pTransactionsRecords } from "../../../components/p2pTransaction"
// import { authOptions } from "../../lib/auth";
// import prisma from "@repo/db/client";

// async function p2pTransaction() {
//     const session = await getServerSession(authOptions);
//     const txns = await prisma.p2pTransfer.findMany({
//         where: {
//             toUserId: Number(session?.user?.id),
            
//         }
//     });
//     return txns.map(t => ({
//         time: t.startTime,
//         amount: t.amount,
//         status: t.status,
//         provider: t.provider
//     }))
// }

// export default async function() {
//     const transactions = await p2pTransaction();
//     return <div className="w-full">
//         <SendCard />
//         if(transaction){
// <p2pTransactionsRecords transaction={transactions}/>        }
//     </div>
// }