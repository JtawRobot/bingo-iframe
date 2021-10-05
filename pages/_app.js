import '../styles/globals.css';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background: #03002e;
    font-family: Roboto, sans-serif;
    font-size: 10px;
  }
`;

function BingoIframe({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}

export default BingoIframe;
