"use client";
import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Input from "@/components/Input";
import Table from "@/components/Table";
import WhiteBox from "@/components/WhiteBox";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";

const ColumnsWraper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  margin-top: 40px;

  @media screen and (min-width: 768px) {
    grid-template-columns: 1.3fr 0.7fr;
  }
`;

const ProductInfoCell = styled.td`
  padding: 10px 0;

  span {
    font-size: 0.7rem;
    @media screen and (min-width: 768px) {
      font-size: 1rem;
    }
  }
`;
const StyledTd = styled.td`
  div {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    justify-content: center;
    height: 100%;
    @media screen and (min-width: 420px) {
      display: block;
    }
  }
`;

const ProductImageBox = styled.div`
  box-sizing: border-box;
  width: 100px;
  height: 100px;
  padding: 5px;
  /* background-color: #f0f0f0; */
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(0, 0, 0, 0.1);
  img {
    max-width: 100%;
    max-height: 100%;
  }

  @media screen and (min-width: 768px) {
    padding: 15px;
  }
`;

const QuantifyLabel = styled.span`
  padding: 0 3px;
`;

const SitiHolder = styled.div`
  display: flex;
  gap: 5px;
`;

export default function CartPage() {
  const { cartProducts, addProduct, removeProduct, clearProduct } = useContext(CartContext);
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");

  const [successOperation, setSuccessOperation] = useState(false);

  useEffect(() => {
    if (router.asPath.includes("success")) {
      setSuccessOperation(true);
      setProducts([]);
      clearProduct();
    }
  }, [clearProduct, router]);

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((res) => {
        setProducts(res.data);
      });
    } else if (cartProducts.length === 0) {
      setProducts([]);
    }
  }, [cartProducts]);

  function moreOfThisProduct(id) {
    addProduct(id);
  }
  function lessOfThisProduct(id) {
    removeProduct(id);
  }

  async function goToPayment() {
    const res = await axios.post("/api/checkout", {
      name,
      email,
      city,
      postalCode,
      streetAddress,
      country,
      products: cartProducts,
    });
    if (res.data.url) {
      window.location = res.data.url;
    }
  }

  let total = 0;

  for (const productId of cartProducts) {
    const price = products.find((p) => p._id === productId)?.price || 0;
    total += price;
  }

  return (
    <>
      <Header />
      <Center>
        {successOperation ? (
          <ColumnsWraper>
            <WhiteBox>
              <h1 style={{ marginBottom: "10px" }}>Thanks for your order!</h1>
              <p>We will email you when your order will be sent</p>
            </WhiteBox>
          </ColumnsWraper>
        ) : (
          <ColumnsWraper>
            <WhiteBox>
              <h2>Cart</h2>
              {!cartProducts?.length && <div>Your cart is empty</div>}
              {!!products?.length && (
                <Table>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Quantify</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product._id}>
                        <ProductInfoCell>
                          <ProductImageBox>
                            <img src={product.images[0]} alt={product.title} />
                          </ProductImageBox>

                          <span>{product.title}</span>
                        </ProductInfoCell>
                        <StyledTd>
                          <div>
                            <Button onClick={() => lessOfThisProduct(product._id)}>-</Button>
                            <QuantifyLabel>
                              {cartProducts.filter((id) => id === product._id).length}
                            </QuantifyLabel>

                            <Button onClick={() => moreOfThisProduct(product._id)}>+</Button>
                          </div>
                        </StyledTd>
                        <td>
                          ${product.price * cartProducts.filter((id) => id === product._id).length}
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td></td>
                      <td></td>
                      <td>${total}</td>
                    </tr>
                  </tbody>
                </Table>
              )}
            </WhiteBox>
            {!!cartProducts?.length && (
              <WhiteBox>
                <h2>Order information</h2>
                <Input
                  type="text"
                  placeholder="Name"
                  value={name}
                  name="name"
                  onChange={(ev) => setName(ev.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Email"
                  value={email}
                  name="naemailme"
                  onChange={(ev) => setEmail(ev.target.value)}
                />
                <SitiHolder>
                  <Input
                    type="text"
                    placeholder="City"
                    value={city}
                    name="city"
                    onChange={(ev) => setCity(ev.target.value)}
                  />
                  <Input
                    type="number"
                    placeholder="Postal Code"
                    value={postalCode}
                    name="postalCode"
                    onChange={(ev) => setPostalCode(ev.target.value)}
                  />
                </SitiHolder>
                <Input
                  type="text"
                  placeholder="Street Address"
                  value={streetAddress}
                  name="streetAddress"
                  onChange={(ev) => setStreetAddress(ev.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Country"
                  value={country}
                  name="country"
                  onChange={(ev) => setCountry(ev.target.value)}
                />

                <Button onClick={goToPayment} type="button" primary={1} block={1}>
                  Continue to payment
                </Button>
              </WhiteBox>
            )}
          </ColumnsWraper>
        )}
      </Center>
    </>
  );
}
