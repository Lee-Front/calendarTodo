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

  .navigate-push-enter {
    transform: translateX(100%);
  }

  .navigate-push-enter-active {
    z-index: 1;
    transform: translateX(0);
    transition: transform 300ms ease-in-out;

    box-shadow: -5px 0px 25px rgba(0, 0, 0, 0.05);
  }

  .navigate-push-exit {
    transform: translateX(0);
  }

  .navigate-push-exit-active {
    transform: translateX(-20%);
    transition: transform 300ms ease-in-out;
  }

  .transition-wrapper {
    position: relative;
    width: 100vw;
  }
`;
