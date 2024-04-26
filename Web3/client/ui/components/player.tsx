"use client";
import { Card } from "@/components/ui/card";
import { Form } from "./ui/form";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";

import {
    useObservePlayer,
    usePlayerIncreaseBravery,
    usePlayerIncreaseLeadership,
    usePlayerLevelUp,
    usePlayerNewPlayer,
    usePlayerStore
} from "@/lib/stores/player/player";

export interface PlayerProps {
    wallet?: string,
    loading: boolean,
    onConnectWallet: () => void;
}

export function Player({
    wallet,
    onConnectWallet,
    loading,
} : PlayerProps) {
    const form = useForm();
    // New player method
    const newPlayer = usePlayerNewPlayer();
    // Level up method
    const levelUp = usePlayerLevelUp();
    // Increase bravery method
    const increaseBravery = usePlayerIncreaseBravery();
    // Increase leadership method
    const increaseLeadership = usePlayerIncreaseLeadership();
    // Get player store
    const player = usePlayerStore();
    // Start checking the changes on the player runtime module
    useObservePlayer();

    return(
        <Card className="w-full p-4">
            <div className="mb-2">
                <h2 className="text-xl font-bold">Player</h2>
                <p className="mt-1 text-sm text-zinc-500">
                    Interact with player runtime manually
                </p>
                { player && wallet && player.players[wallet] && player.players[wallet].level != null ?
                (
                    <div>
                        <p className="mt-1 text-sm"> 
                            { ", Level: " + player.players[wallet].level }
                            { ", XP: " + player.players[wallet].level }
                            { ", Charisma: " + player.playerStats[wallet].charisma }
                            { ", Reputation: " + player.playerStats[wallet].reputation }
                            { ", Leadership: " + player.playerStats[wallet].leadership }
                            { ", Bravery: " + player.playerStats[wallet].bravery }
                        </p>
                    </div>
                ) : (
                    <p className="mt-1 text-sm">This wallet address has no player, create a new one</p>
                    )
                }
            </div>
            <Form {...form}>
                { wallet ? (
                    <div className="flex flex-row">
                        <Button style={{marginLeft: '5px', marginRight: '5px'}} size={"lg"} type="submit" className="mt-6 w-full" loading={loading} onClick={() => { newPlayer() }}>
                            New Player
                        </Button>
                        <Button style={{marginLeft: '5px', marginRight: '5px'}} size={"lg"} type="submit" className="mt-6 w-full" loading={loading} onClick={() => { levelUP() }}>
                            Level Up
                        </Button>
                        <Button style={{marginLeft: '5px', marginRight: '5px'}} size={"lg"} type="submit" className="mt-6 w-full" loading={loading} onClick={() => { increaseLeadership() }}>
                            Increase Leadership
                        </Button>
                        <Button style={{marginLeft: '5px', marginRight: '5px'}} size={"lg"} type="submit" className="mt-6 w-full" loading={loading} onClick={() => { increaseBravery() }}>
                            Increase Bravery
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