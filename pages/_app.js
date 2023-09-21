import { CartContextProvider } from "@/components/CartContext";
import { GlobalStyles } from "@/styles/GlobalStyles";

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <CartContextProvider>
        <Component {...pageProps} />
      </CartContextProvider>
    </>
  );
}
