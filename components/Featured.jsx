import styled from "styled-components";
import Center from "./Center";
import Button from "./Button";
import ButtonLink from "./ButtonLink";

import thema from "@/lib/colors";
import CartIcon from "./icons/CartIcon";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const Bg = styled.div`
  background-color: #222;
  color: ${thema.white};
  padding: 50px 0;
`;
const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 2rem;
  @media screen and (min-width: 768px) {
    font-size: 3rem;
  }
`;
const Desc = styled.p`
  color: ${thema.silver};
  font-size: 0.8rem;
`;
const ColumnsWrapper = styled.div`
  display: grid;
  gap: 40px;
  grid-template-columns: 1fr;

  img {
    max-width: 100%;
    max-height: 200px;
    display: block;
    margin: 0 auto;
  }
  div:nth-child(1) {
    order: 2;
  }

  @media screen and (min-width: 768px) {
    grid-template-columns: 0.9fr 1.1fr;
    div:nth-child(1) {
      order: 0;
    }
  }
`;
const Column = styled.div`
  display: flex;
  align-items: center;
`;
const BtnWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 25px;
`;

export default function Featured({ product }) {
  const { addProduct } = useContext(CartContext);

  function addFeaturedToCard() {
    addProduct(product._id);
  }
  return (
    <Bg>
      <Center>
        <ColumnsWrapper>
          <Column>
            <div>
              <Title>{product.title}</Title>
              <Desc>{product.description}</Desc>
              <BtnWrapper>
                <ButtonLink href={"/products" + product._id} white={1} outline={1}>
                  Read more
                </ButtonLink>
                <Button primary={1} onClick={addFeaturedToCard}>
                  <CartIcon />
                  Add to cart
                </Button>
              </BtnWrapper>
            </div>
          </Column>
          <Column>
            <img src={product.images[0]} alt={product.title} />
          </Column>
        </ColumnsWrapper>
      </Center>
    </Bg>
  );
}
