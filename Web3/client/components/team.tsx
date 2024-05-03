"use client";
import { Card } from "@/components/ui/card";
import { Form } from "./ui/form";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";

import {
    useObserveTeam,
    useTeamStore,
    useTeamNewTeam,
    useTeamInvitePlayer,
    useTeamAcceptInvitation,
    useTeamLeaveTeam 
} from "@/lib/stores/team/team";

export interface TeamProps {
    wallet?: string,
    loading: boolean,
    onConnectWallet: () => void;
}

export function Team({
    wallet,
    onConnectWallet,
    loading,
} : TeamProps) {
    const form = useForm();
    // New team method
    const newTeam = useTeamNewTeam();
    // Invite player method
    const invitePlayer = (playerAddress: string, teamId: number) => useTeamInvitePlayer(playerAddress, teamId);
    // Accept invitation method
    const acceptInvitation = (teamId: number) => useTeamAcceptInvitation(teamId);
    // Leave team method
    const leaveTeam = (teamId: number) => useTeamLeaveTeam(teamId);
    // Get team data
    const team = useTeamStore();
    // Start checking the changes on the team runtime module
    useObserveTeam();

    return(
        <Card className="w-full p-4">
            <div className="mb-2">
                <h2 className="text-xl font-bold">Guild</h2>
                <p className="mt-1 text-sm text-zinc-500">
                    Interact with team runtime manually
                </p>
                { team && wallet && team.teams["1"] && team.teams["1"].memberCount != null ?
                (
                    <div>
                        <p className="mt-1 text-sm"> 
                            { "Leader: " + team.teams["1"].leader.slice(0,7) + "..." +  team.teams["1"].leader.slice(-7)}
                            { ", Member Count: " + team.teams["1"].memberCount }
                        </p>
                    </div>
                ) : (
                    <p className="mt-1 text-sm">This wallet address has no team, create a new one or join</p>
                    )
                }
            </div>
            <Form {...form}>
                { wallet ? (
                    <div className="flex flex-row">
                        <Button style={{marginLeft: '5px', marginRight: '5px'}} size={"lg"} type="submit" className="mt-6 w-full" loading={loading} onClick={() => { newTeam() }}>
                            New Team
                        </Button>
                        <Button style={{marginLeft: '5px', marginRight: '5px'}} size={"lg"} type="submit" className="mt-6 w-full" loading={loading} onClick={() => { invitePlayer(1, "wallet_address") }}>
                            Invite Player
                        </Button>
                        <Button style={{marginLeft: '5px', marginRight: '5px'}} size={"lg"} type="submit" className="mt-6 w-full" loading={loading} onClick={() => { acceptInvitation(1) }}>
                            Accept Invitation
                        </Button>
                        <Button style={{marginLeft: '5px', marginRight: '5px'}} size={"lg"} type="submit" className="mt-6 w-full" loading={loading} onClick={() => { leaveTeam(1) }}>
                            Leave Team
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