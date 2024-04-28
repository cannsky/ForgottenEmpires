"use client";
import { Card } from "@/components/ui/card";

export interface DashboardProps {
    wallet?: string,
    loading: boolean,
    onConnectWallet: () => void;
}

export function Dashboard({
    wallet,
} : DashboardProps) {
    return (
        <Card className="w-full p-4">
            <div className="mb-2">
                <h2 className="text-xl font-bold">Dashboard</h2>
                <p className="mt-1 text-sm text-zinc-500">
                    See the runtime stats
                </p>
                { wallet ? 
                    (
                        <div>
                            <p className="mt-1 text-sm">Wallet Address Connected: { wallet }</p>
                        </div>
                    ) : (
                        <p className="mt-1 text-sm">Please connect a wallet to see the stats</p>
                    )
                }
            </div>
        </Card>
    );
}