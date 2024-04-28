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
                { guild && wallet && guild.guilds["1"] && guild.guilds["1"].memberCount != null ?
                (
                    <div>
                        <p className="mt-1 text-sm"> 
                            { "Leader: " + guild.guilds["1"].leader.slice(0,7) + "..." +  guild.guilds["1"].leader.slice(-7)}
                            { ", Member Count: " + guild.guilds["1"].memberCount }
                        </p>
                    </div>
                ) : (
                    <p className="mt-1 text-sm">This wallet address has no guild, create a new one or join</p>
                    )
                }
            </div>
            <Form {...form}>
                { wallet ? (
                    <div className="flex flex-row">
                        <Button style={{marginLeft: '5px', marginRight: '5px'}} size={"lg"} type="submit" className="mt-6 w-full" loading={loading} onClick={() => { newGuild() }}>
                            New Guild
                        </Button>
                        <Button style={{marginLeft: '5px', marginRight: '5px'}} size={"lg"} type="submit" className="mt-6 w-full" loading={loading} onClick={() => { joinGuild(1) }}>
                            Join Guild
                        </Button>
                        <Button style={{marginLeft: '5px', marginRight: '5px'}} size={"lg"} type="submit" className="mt-6 w-full" loading={loading} onClick={() => { leaveGuild(1) }}>
                            Leave Guild
                        </Button>
                    </div>
                ) : (
                    <div className="flex flex-row">
                        <Button style={{marginLeft: '5px', marginRight: '5px'}} size={"lg"} type="submit" className="mt-6 w-full" loading={loading} onClick={() => { onConnectWallet() }}>
                            Connect Wallet
                        </Button>
                    </div>
                    )
                }
            </Form>
        </Card>
    );
}