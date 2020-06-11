import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Fira+Sans:wght@300;400;600&display=swap');

    *, *::after, *::before {
        box-sizing: border-box;
        padding: 0;
        font-family: inherit;
        margin: 0;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale; 
    }

    html {
        font-size: 62.5%;
    }

    body {
        font-size: 1.6rem;
        font-family: 'Fira Sans', sans-serif;
    }
`;

export default GlobalStyles;
