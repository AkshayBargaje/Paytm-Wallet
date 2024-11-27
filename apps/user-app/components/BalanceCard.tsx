import { Card } from "@repo/ui/card";

export const BalanceCard = ({amount, locked}: {
    amount: number;
    locked: number;
}) => {
    return <div className="">
        <Card title={"Balance"}>
        <div className="flex justify-between border-b border-slate-300 pb-2 text-black">
            <div className="text-black">
                Unlocked balance
            </div>
            <div>
                {amount / 100} INR
            </div>
        </div>
        <div className="flex justify-between border-b border-slate-300 py-2 text-black">
            <div>
                Total Locked Balance
            </div>
            <div>
                {locked / 100} INR
            </div>
        </div>
        <div className="flex justify-between border-b border-slate-300 py-2 text-black">
            <div className="text-black">
                Total Balance
            </div>
            <div className="text-black">
                {(locked + amount) / 100} INR
            </div>
        </div>
    </Card>
    </div>
}