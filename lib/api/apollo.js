import { ApolloClient, InMemoryCache } from "@apollo/client";
import { relayStylePagination } from "@apollo/client/utilities";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        posts: relayStylePagination(),
      },
    },
  },
});

const client = new ApolloClient({
  uri: process.env.WORDPRESS_URL_ENDPOINT,
  cache: cache
});

export default client;
