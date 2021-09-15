import { AppContext, AppInitialProps } from "next/app";
import { ApolloProvider } from "@apollo/client";

import { useApollo } from "../services/apollo";
import Layout from "../components/Layout";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps);

  return (
    <ApolloProvider client={apolloClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
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
