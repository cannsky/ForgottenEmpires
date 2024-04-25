"use client";
import { Card } from "@/components/ui/card";
import { Form } from "./ui/form";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";

import {
    useGuildJoinGuild,
    useGuildLeaveGuild,
    useGuildNewGuild,
    useGuildStore,
    UseObserveGuild
} from "@/lib/stores/guild/guild";

export interface GuildProps {
    wallet?: string,
    loading: boolean,
    onConnectWallet: () => void;
}

export function Guild({
    wallet,
    onConnectWallet,
    loading,
} : GuildProps) {
    const form = useForm();
    // New guild method
    const newGuild = useGuildNewGuild();
    // Join guild method
    const joinGuild = useGuildJoinGuild();
    // Leave guild method
    const leaveGuild = useGuildLeaveGuild();
    // Get guild store
    const guild = useGuildStore();
    // Start checking the changes on the character runtime module
    UseObserveGuild();

    return(
        <Card className="w-full p-4">
            <div className="mb-2">
                <h2 className="text-xl font-bold">Guild</h2>
                <p className="mt-1 text-sm text-zinc-500">
                    Interact with guild runtime manually
                </p>
                { guild && wallet && guild.guilds["0"] && guild.guilds["0"].memberCount != null ?
                (
                    <div>
                        <p className="mt-1 text-sm"> { "Leader: " + guild.guilds["0"].leader }</p>
                        <p className="mt-1 text-sm"> { "Member Count: " + guild.guilds["0"].memberCount }</p>
                    </div>
                ) : (
                    <p className="mt-1 text-sm">This wallet address has no guild, create a new one or join</p>
                    )
                }
            </div>
            <Form {...form}>
                { wallet ? (
                    <Button size={"lg"} type="submit" className="mt-6 w-full" loading={loading} onClick={() => { newGuild() }}>
                        New Guild
                    </Button>
                    <Button size={"lg"} type="submit" className="mt-6 w-full" loading={loading} onClick={() => { joinGuild() }}>
                        Join Guild
                    </Button>
                    <Button size={"lg"} type="submit" className="mt-6 w-full" loading={loading} onClick={() => { leaveGuild() }}>
                        Leave Guild
                    </Button>
                ) : (
                    <Button size={"lg"} type="submit" className="mt-6 w-full" loading={loading} onClick={() => { onConnectWallet() }}>
                        Connect Wallet
                    </Button>
                    )
                }
            </Form>
        </Card>
    );
}