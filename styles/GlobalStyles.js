import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap');
${
  "" /* *{
    box-sizing:border-box
} */
}

body{
    padding:0;
    margin:0;
    font-family: 'Roboto', sans-serif;
    background-color:#eee
}
a{
    text-decoration:none
}
h1,h2,h3,h4,h5,h6,p{
    margin:0
}
`;
