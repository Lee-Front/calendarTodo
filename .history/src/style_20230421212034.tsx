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

  #root {
    display: flex;
    justify-content: center;
  }
  html {
    -webkit-user-drag: none;
    -webkit-user-select: none;
    font-size: 62.5%;
    min-width: 60rem;
  }

  a {
    -webkit-user-drag: none;
    -webkit-user-select: none;
  }

  img {
    -webkit-user-drag: none;
    -webkit-user-select: none;
  }

  .page-transition-enter {
    position: absolute;
    transform: scale(4);
  }

  .page-transition-enter-active {
    position: absolute;
    z-index: 1;
    transition: transform 300ms ease-in-out;
    transform: scale(1);
    //box-shadow: -5px 0px 25px rgba(0, 0, 0, 0.05);
  }

  .page-transition-exit {
    position: absolute;
  }

  .page-transition-exit-active {
    position: absolute;
    //transform: translateX(-20%);
    transition: transform 300ms ease-in-out;
  }
`;
