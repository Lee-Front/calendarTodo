import { css } from "@emotion/react";

export const globalStyles = css`
  * {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    box-sizing: border-box;
  }
  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: "";
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  html,
  body,
  #root {
    height: 100vh;
  }
  html {
    -webkit-user-drag: none;
    -webkit-user-select: none;
    font-size: 62.5%;
    min-width: 30rem;
  }

  a {
    -webkit-user-drag: none;
    -webkit-user-select: none;
  }

  img {
    -webkit-user-drag: none;
    -webkit-user-select: none;
  }
`;
