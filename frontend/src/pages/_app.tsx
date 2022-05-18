import type { AppProps } from "next/app";
import { AuthProvider } from "../context/AuthContext";
import React from "react";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
      <>
          <AuthProvider>
              <Component {...pageProps} />
          </AuthProvider>
      </>
  );
}

export default MyApp;
