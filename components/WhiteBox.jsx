import thema from "@/lib/colors";
import styled from "styled-components";

const StyledBox = styled.div`
  background-color: ${thema.white};
  border-radius: 10px;
  padding: 30px;
`;

export default function WhiteBox(props) {
  return <StyledBox {...props} />;
}
