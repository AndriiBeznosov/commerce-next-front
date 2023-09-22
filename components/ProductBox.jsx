import styled from "styled-components";
import Button from "./Button";
import CartIcon from "./icons/CartIcon";
import thema from "@/lib/colors";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const ProductWrapper = styled.div``;

const WhiteBox = styled(Link)`
  background-color: ${thema.white};
  padding: 20px;
  height: 120px;
  /* text-align: center; */
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  cursor: pointer;
  img {
    max-width: 100%;
    max-height: 80px;
  }
`;

const Title = styled.h2`
  font-weight: normal;
  font-size: 0.9rem;
`;

const ProducInfoBox = styled.div`
  margin-top: 5px;
`;

const PriceRow = styled.div`
  display: block;
  @media screen and (min-width: 768px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 5px;
    gap: 5px;
  }
`;

const Price = styled.p`
  font-size: 1rem;
  font-weight: bold;
  margin-top: 5px;
  margin-bottom: 5px;

  @media screen and (min-width: 768px) {
    font-size: 1.5rem;
    margin-top: 0;
    margin-bottom: 0;
  }
`;

export default function ProductBox({ product }) {
  const { addProduct } = useContext(CartContext);
  const url = "/product/" + product._id;
  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <div>
          <img src={product.images[0]} alt={product.title} />
        </div>
      </WhiteBox>
      <ProducInfoBox>
        <Title>{product.title}</Title>
        <PriceRow>
          <Price>${product.price}</Price>
          <div>
            <Button block={1} onClick={() => addProduct(product._id)} primary={1} outline={1}>
              <CartIcon />
            </Button>
          </div>
        </PriceRow>
      </ProducInfoBox>
    </ProductWrapper>
  );
}
