// This code is not completed.
// This code is not audited.

export const useChainStore = async function() {
    const response = await fetch("http://localhost:8080/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: `
                query GetBlock {
                    block {
                        txs {
                            tx {
                                argsFields
                                argsJSON
                                methodId
                                nonce
                                sender
                                signature {
                                    r
                                    s
                                }
                                status
                                statusMessage
                            }
                        }
                        network {
                            unproven {
                                block {
                                    height
                                }
                            }
                        }
                    }
                }
            `,
        }),
    });

    const data = await response.json();
}