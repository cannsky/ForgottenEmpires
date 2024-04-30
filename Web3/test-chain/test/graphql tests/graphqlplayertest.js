const graphqlEndpoint = "http://localhost:8080/graphql";

const query = `
    query TestPlayerQuery {
        runtime: {
            Player: {
                players(key: "Some_Wallet_Address_Here") {
                    level: {
                        value
                    }
                    xp {
                        value
                    }
                }
            }
        }
    } 
`;

fetch(graphqlEndpoint, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query });
})
    .then(response => response.json())
    .then(graphqlData => {
        let testBool = graphqlData.data.runtime.Player.players.level.value == 1 &&
            graphqlData.data.runtime.Player.players.xp.value == 1000;
        console.log(testBool);
    })
    .catch(error => console.error('Error: ', error));