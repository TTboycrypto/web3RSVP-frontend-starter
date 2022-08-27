import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/ttboycrypto/web3-graph",
  cache: new InMemoryCache(),
});

export default client;