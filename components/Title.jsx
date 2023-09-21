import styled from "styled-components";

const StyledTitle = styled.h2`
  font-size: 1.5;
  margin: 30px 0 20px;
  font-weight: 600;
`;

export default function Title(props) {
  return <StyledTitle {...props} />;
}
