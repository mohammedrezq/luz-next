import { AppContext, AppInitialProps } from "next/app";
import { ApolloProvider } from "@apollo/client";

import { useApollo } from "../services/apollo";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps);

  return (
    <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
    </ApolloProvider>
  );
}

// function MyApp({ Component, pageProps }) {
//   return (
//     <ApolloProvider client={client}>
//       <Layout>
//         <Component {...pageProps} />
//       </Layout>
//     </ApolloProvider>
//   );
// }

export default MyApp;
