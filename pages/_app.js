import { AppContext, AppInitialProps } from "next/app";
import { ApolloProvider } from "@apollo/client";

import { useApollo } from "../services/apollo";
import "../styles/globals.scss";
import NextNProgress from "nextjs-progressbar";

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps);

  return (
    <ApolloProvider client={apolloClient}>
        <NextNProgress height={2} color="#000" />
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
