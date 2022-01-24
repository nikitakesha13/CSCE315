import { createGlobalStyle } from "styled-components";

export const lightTheme = {
    body: "#fff",
    fontColor: "#000",
};

export const darkTheme = {
    body: "#282828",
    fontColor: "#F5F5F5",
};

export const GlobalStyles = createGlobalStyle`

    body {

        background-color: ${(props) => 
            props.theme.body
        };

    }

`;
