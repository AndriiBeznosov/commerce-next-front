import thema from "@/lib/colors";
import styled, { css } from "styled-components";

export const BtnStyle = css`
  border: 0;
  padding: 5px 15px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  svg {
    height: 16px;
    margin-right: 5px;
  }

  ${(p) =>
    p.block &&
    css`
      display: block;
      width: 100%;
    `}
  ${(p) =>
    p.white &&
    !p.outline &&
    css`
      background-color: ${thema.white};
      color: ${thema.black};
    `}
  ${(p) =>
    p.white &&
    p.outline &&
    css`
      background-color: transparent;
      color: ${thema.white};
      border: 1px solid ${thema.white};
    `}
    ${(p) =>
    p.primary &&
    !p.outline &&
    css`
      background-color: ${thema.primary};
      color: ${thema.white};
      border: 1px solid ${thema.primary};
    `}
    ${(p) =>
    p.primary &&
    p.outline &&
    css`
      background-color: transparent;
      color: ${thema.primary};
      border: 1px solid ${thema.primary};
    `}
    ${(p) =>
    p.size === "l" &&
    css`
      font-size: 1.2rem;
      padding: 10px 25px;
      svg {
        height: 20px;
      }
    `};
`;

const StyledBtn = styled.button`
  ${BtnStyle}
`;

export default function Button({ children, ...rest }) {
  return <StyledBtn {...rest}>{children}</StyledBtn>;
}
