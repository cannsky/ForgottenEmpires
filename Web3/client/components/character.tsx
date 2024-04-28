"use client";
import { Card } from "@/components/ui/card";
import { Form } from "./ui/form";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";

import {
    useObserveCharacter,
    useCharacterChangeWorld,
    useCharacterLevelUp,
    useCharacterNewCharacter,
    useCharacterUpgradeDefense,
    useCharacterUpgradeDamage,
    useCharacterStore
} from "@/lib/stores/character/character";

export interface CharacterProps {
    wallet?: string,
    loading: boolean,
    onConnectWallet: () => void;
}

export function Character({
    wallet,
    onConnectWallet,
    loading,
} : CharacterProps) {
    const form = useForm();
    // Change world method
    const changeWorld = (characterId: number, characterWorld: number) => useCharacterChangeWorld(characterId, characterWorld);
    // Level up method
    const levelUp = (characterId: number) => useCharacterLevelUp(characterId);
    // New character method
    const newCharacter = (characterType: number) => useCharacterNewCharacter(characterType);
    // Upgrade damage method
    const upgradeDamage = (characterId: number) => useCharacterUpgradeDamage(characterId);
    // Upgrade defense method
    const upgradeDefense = (characterId: number) => useCharacterUpgradeDefense(characterId);
    // Get character store
    const character = useCharacterStore();
    // Start checking the changes on the character runtime module
    useObserveCharacter(1);

    return(
        <Card className="w-full p-4">
            <div className="mb-2">
                <h2 className="text-xl font-bold">Character</h2>
                <p className="mt-1 text-sm text-zinc-500">
                    Interact with character runtime manually
                </p>
                { character && wallet && character.characters[wallet] && character.characters[wallet].level != null ?
                (
                    <div>
                        <p className="mt-1 text-sm"> 
                            { ", Level: " + character.characters[wallet].level }
                            { ", XP: " + character.characters[wallet].xp }
                            { ", Stat XP: " + character.characters[wallet].statxp }
                            { ", Damage: " + character.characters[wallet].damage }
                            { ", Defense: " + character.characters[wallet].defense }
                            { ", Type: " + character.characters[wallet].type }
                            { ", World: " + character.characters[wallet].world }
                        </p>
                    </div>
                ) : (
                    <p className="mt-1 text-sm">This wallet address has no character, create a new one</p>
                    )
                }
            </div>
            <Form {...form}>
                { wallet ? (
                    <div className="flex flex-row">
                        <Button size={"lg"} type="submit" className="mt-6 w-full" loading={loading} onClick={() => { newCharacter(1) }}>
                            New Character
                        </Button>
                        <Button size={"lg"} type="submit" className="mt-6 w-full" loading={loading} onClick={() => { levelUp(1) }}>
                            Level Up
                        </Button>
                        <Button size={"lg"} type="submit" className="mt-6 w-full" loading={loading} onClick={() => { upgradeDamage(1) }}>
                            Upgrade Damage
                        </Button>
                        <Button size={"lg"} type="submit" className="mt-6 w-full" loading={loading} onClick={() => { upgradeDefense(1) }}>
                            Upgrade Defense
                        </Button>
                        <Button size={"lg"} type="submit" className="mt-6 w-full" loading={loading} onClick={() => { changeWorld(1, 1) }}>
                            Change World
                        </Button>
                    </div>
                ) : (
                    <div className="flex flex-row">
                        <Button size={"lg"} type="submit" className="mt-6 w-full" loading={loading} onClick={() => { onConnectWallet() }}>
                            Connect Wallet
                        </Button>
                    </div>
                    )
                }
            </Form>
        </Card>
    );
}