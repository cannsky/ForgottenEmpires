"use client";
import { Character } from "../components/character";
import { Dashboard } from "../components/dashboard";
import { Guild } from "../components/guild";
import { Player } from "../components/player";
import { useWalletStore } from "@/lib/stores/wallet";

export default function Home() {
    const wallet = useWalletStore();

    return(
        <div className="mx-auto -mt-32 pt-16 justify-start">
            <div className="flex flex-row h-full pt-16">
                <div className="flex flex-col 3xl:basis-3/12">
                    <div style={{marginLeft: '20px', marginTop: '20px', width: '100%'}}>
                        <Dashboard 
                            wallet = {wallet.wallet}
                            onConnectWallet={wallet.connectWallet} 
                            loading={false}/>
                    </div>
                    <div style={{marginLeft: '20px', marginTop: '20px', width: '100%'}}>
                        <Player 
                            wallet = {wallet.wallet}
                            onConnectWallet={wallet.connectWallet} 
                            loading={false}/>
                    </div>
                    <div style={{marginLeft: '20px', marginTop: '20px', width: '100%'}}>
                        <Character 
                            wallet = {wallet.wallet}
                            onConnectWallet={wallet.connectWallet} 
                            loading={false}/>
                    </div>
                    <div style={{marginLeft: '20px', marginTop: '20px', width: '100%'}}>
                        <Guild 
                            wallet = {wallet.wallet}
                            onConnectWallet={wallet.connectWallet} 
                            loading={false}/>
                    </div>
                </div>
            </div>
        </div>
    );
}