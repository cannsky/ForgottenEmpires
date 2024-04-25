"use client";
import { Card } from "@/components/ui/card";
import { Form } from "./ui/form";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";

import {
    useObserveCharacter,
    useCharacterChangeWorld,
    useCharacterLevelUP,
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
    const changeWorld = useCharacterChangeWorld();
    // Level up method
    const levelUP = useCharacterLevelUP();
    // New character method
    const newCharacter = useCharacterNewCharacter();
    // Upgrade damage method
    const upgradeDamage = useCharacterUpgradeDamage();
    // Upgrade defense method
    const upgradeDefense = useCharacterUpgradeDefense();
    // Get character store
    const character = useCharacterStore();
    // Start checking the changes on the character runtime module
    useObserveCharacter();

    return(
        <Card className="w-full p-4">
            <div className="mb-2">
                <h2 className="text-xl font-bold">Character</h2>
                <p className="mt-1 text-sm text-zinc-500">
                    Interact with character runtime manually
                </p>
                { character && wallet && character.characters[wallet]["0"] && character.characters[wallet]["0"].level != null ?
                (
                    <div>
                        <p className="mt-1 text-sm"> { "Level: " + character.characters[wallet]["0"].level }</p>
                        <p className="mt-1 text-sm"> { "XP: " + character.characters[wallet]["0"].xp }</p>
                        <p className="mt-1 text-sm"> { "Stat XP: " + character.characters[wallet]["0"].statxp }</p>
                        <p className="mt-1 text-sm"> { "Damage: " + character.characters[wallet]["0"].damage }</p>
                        <p className="mt-1 text-sm"> { "Defense: " + character.characters[wallet]["0"].defense }</p>
                        <p className="mt-1 text-sm"> { "Type: " + character.characters[wallet]["0"].type }</p>
                        <p className="mt-1 text-sm"> { "World: " + character.characters[wallet]["0"].world }</p>
                    </div>
                ) : (
                    <p className="mt-1 text-sm">This wallet address has no character, create a new one</p>
                    )
                }
            </div>
            <Form {...form}>
                { wallet ? (
                    <Button size={"lg"} type="submit" className="mt-6 w-full" loading={loading} onClick={() => { newCharacter() }}>
                        New Character
                    </Button>
                    <Button size={"lg"} type="submit" className="mt-6 w-full" loading={loading} onClick={() => { levelUP() }}>
                        Level UP
                    </Button>
                    <Button size={"lg"} type="submit" className="mt-6 w-full" loading={loading} onClick={() => { upgradeDamage() }}>
                        Upgrade Damage
                    </Button>
                    <Button size={"lg"} type="submit" className="mt-6 w-full" loading={loading} onClick={() => { upgradeDefense() }}>
                        Upgrade Defense
                    </Button>
                    <Button size={"lg"} type="submit" className="mt-6 w-full" loading={loading} onClick={() => { changeWorld() }}>
                        Change World
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