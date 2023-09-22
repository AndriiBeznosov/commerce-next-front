import Link from "next/link";
import styled from "styled-components";
import Center from "./Center";
import thema from "@/lib/colors";
import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import BarsIcon from "./icons/BarsIcon";

const StyledHeader = styled.header`
  background-color: #222;
`;

const Logo = styled(Link)`
  color: ${thema.white};

  position: relative;
  z-index: 3;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
`;

const StyledNav = styled.nav`
  display: ${(p) => (p.active ? "block" : "none")};
  box-sizing: border-box;
  gap: 15px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 70px 20px 20px;
  background-color: #222;
  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
    background-color: transparent;
    padding: 0;
  }
`;

const NavLink = styled(Link)`
  display: block;
  color: #aaa;
  padding: 10px 0;
  @media screen and (min-width: 768px) {
    padding: 0;
  }
`;

const NavBtn = styled.button`
  cursor: pointer;
  background-color: transparent;
  width: 50px;
  height: 50px;
  border: 0;
  color: white;
  position: relative;
  z-index: 3;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

export default function Header() {
  const { cartProducts } = useContext(CartContext);
  const [mobileNavActive, setMobileNavActive] = useState(false);
  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href={"/"}> Ecommerce</Logo>
          <StyledNav active={mobileNavActive ? 1 : 0}>
            <NavLink href={"/"}>Home</NavLink>
            <NavLink href={"/products"}>All products</NavLink>
            <NavLink href={"/categories"}>Categories</NavLink>
            <NavLink href={"/account"}>Account</NavLink>
            <NavLink href={"/cart"}>Cart ({cartProducts.length})</NavLink>
          </StyledNav>

          <NavBtn onClick={() => setMobileNavActive((prev) => !prev)}>
            <BarsIcon />
          </NavBtn>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}
