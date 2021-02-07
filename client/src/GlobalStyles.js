import { createGlobalStyle } from "styled-components";

export const themeVars = {
    darkGreen: "#07617D",
    lightGreen: "rgba(7, 97, 125, 0.3)",
    secondGreen: "rgba(167, 194, 202, 0.5)",
    darkBlue: "#070D59",
    lightBlack: "rgba(46, 56, 63, 0.93)",
    lightBlue: "rgba(7, 13, 89, 0.33)",
    darkColor: "#2E383F",
    lightColor: "#ECECEB",
    YellowColor: "#F9A828",
}


export default createGlobalStyle`
*,
*:before,
*:after {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
}

html, body, div,
input, button, select, option,
h1, h2, h3, h4, h5, h6, p,
text {
    font-family: sans-serif;
}

html, body {
    max-width: 100vw;
}


html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
    display: block;
}
body {
    line-height: 1;
}
ol, ul {
    list-style: none;
}
blockquote, q {
    quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
    content: '';
    content: none;
}

h1,
h2,
h3,
label,
button {
color: #fff;
font-size: 32px;
text-align: center;
}

input {
font-size: 24px;
height: 42px;
border: 2px solid var(--darkBlue);
border-radius: 4px;
padding: 0 12px;
}
`;