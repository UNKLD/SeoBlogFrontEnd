import Document, { Html, Head, Main, NextScript } from "next/document";
import { APP_NAME } from "../config";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="shortcut icon" href="/images/favicon.ico" />
          <meta charSet="UTF-8" />
          <link rel="stylesheet" href="/bootstrap.min.css" />
          <link rel="stylesheet" href="/styles.css" />
          <link rel="stylesheet" href="/nprogress.css" />
          <title>{APP_NAME}</title>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
