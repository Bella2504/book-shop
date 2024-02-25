import { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "@mui/material";
import { useApollo } from "../lib/apollo";
import Header from "./header";
import "../lib/globals.css";

import theme from "../lib/theme";

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  const pageComponent = <Component {...pageProps} />;

  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={apolloClient}>
        <Header />
        <div className="my-8 mx-8 md:my-16 md:mx-24">{pageComponent}</div>
      </ApolloProvider>
    </ThemeProvider>
  );
}
