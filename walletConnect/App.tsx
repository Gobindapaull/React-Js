import { useEffect, useState } from "react";
import { ethers } from "ethers";

import "./App.css";

function App() {
    const [account, setAccount] =
        useState<string>("");

    const [provider, setProvider] =
        useState<ethers.BrowserProvider | null>(
            null
        );

    async function connectWallet() {
        try {
            if (!window.ethereum) {
                alert(
                    "MetaMask not installed"
                );

                return;
            }

            const browserProvider =
                new ethers.BrowserProvider(
                    window.ethereum
                );

            const accounts: string[] =
                await browserProvider.send(
                    "eth_requestAccounts",
                    []
                );

            setProvider(
                browserProvider
            );

            setAccount(accounts[0]);

            localStorage.setItem(
                "wallet-connected",
                "true"
            );

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        async function reconnect() {
            try {
                const saved =
                    localStorage.getItem(
                        "wallet-connected"
                    );

                if (!saved) return;

                if (!window.ethereum) return;

                const browserProvider =
                    new ethers.BrowserProvider(
                        window.ethereum
                    );

                const accounts: string[] =
                    await browserProvider.send(
                        "eth_accounts",
                        []
                    );

                if (accounts.length) {
                    setProvider(
                        browserProvider
                    );

                    setAccount(
                        accounts[0]
                    );
                }

            } catch (err) {
                console.log(err);
            }
        }

        reconnect();
    }, []);

    useEffect(() => {
        if (!window.ethereum) return;

        const handleAccountsChanged =
            (accounts: string[]) => {
                if (accounts.length) {
                    setAccount(
                        accounts[0]
                    );
                } else {
                    disconnectWallet();
                }
            };

        const handleChainChanged =
            () => {
                window.location.reload();
            };

        window.ethereum.on(
            "accountsChanged",
            handleAccountsChanged
        );

        window.ethereum.on(
            "chainChanged",
            handleChainChanged
        );

        return () => {
            window.ethereum.removeListener(
                "accountsChanged",
                handleAccountsChanged
            );

            window.ethereum.removeListener(
                "chainChanged",
                handleChainChanged
            );
        };
    }, []);

    function disconnectWallet() {
        setAccount("");
        setProvider(null);

        localStorage.removeItem(
            "wallet-connected"
        );
    }

    return (
        <div className="app">
            <div className="card">
                <div className="top">
                    <div className="dot"></div>

                    <h1>
                        Wallet Dashboard
                    </h1>
                </div>

                <p className="subtitle">
                    React + Ethers.js +
                    TypeScript
                </p>

                {account ? (
                    <>
                        <div className="wallet-box">
                            <span>
                                Connected Wallet
                            </span>

                            <p>
                                {account}
                            </p>
                        </div>

                        <button
                            className="disconnect-btn"
                            onClick={
                                disconnectWallet
                            }
                        >
                            Disconnect
                        </button>
                    </>
                ) : (
                    <button
                        className="connect-btn"
                        onClick={
                            connectWallet
                        }
                    >
                        Connect Wallet
                    </button>
                )}
            </div>
        </div>
    );
}

export default App;
