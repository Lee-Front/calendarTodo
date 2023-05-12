import { css } from "@emotion/react";

export const globalStyles = css`
  @font-face {
    font-family: "SpoqaHanSansNeo-Medium";
    src: "../../public/fonts/SpoqaHanSansNeo-Medium.ttf";
  }
  * {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    vertical-align: baseline;
    box-sizing: border-box;
    font-family: "SpoqaHanSansNeo-Medium";
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
    background: #e9e9e9;
  }
  html {
    -webkit-user-drag: none;
    -webkit-user-select: none;
    font-size: 62.5%;
    min-width: 45rem;
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
    transform: translateX(100%);
  }

  .page-transition-enter-active {
    z-index: 1;
    transform: translateX(0);
    transition: transform 300ms ease-in-out;

    box-shadow: -5px 0px 25px rgba(0, 0, 0, 0.05);
  }

  .page-transition-exit {
    transform: translateX(0);
  }

  .page-transition-exit-active {
    transform: translateX(-100%);
    transition: transform 300ms ease-in-out;
  }

  .left-enter {
    transform: translateX(100%);
  }

  .left-enter-active {
    z-index: 1;
    transform: translateX(0);
    transition: transform 300ms ease-in-out;

    box-shadow: -5px 0px 25px rgba(0, 0, 0, 0.05);
  }

  .left-exit {
    transform: translateX(0);
  }

  .left-exit-active {
    transform: translateX(-100%);
    transition: transform 300ms ease-in-out;
  }

  .right-enter {
    transform: translateX(-100%);
  }

  .right-enter-active {
    z-index: 1;
    transform: translateX(0);
    transition: transform 300ms ease-in-out;

    box-shadow: -5px 0px 25px rgba(0, 0, 0, 0.05);
  }

  .right-exit {
    transform: translateX(0);
  }

  .right-exit-active {
    transform: translateX(100%);
    transition: transform 300ms ease-in-out;
  }
`;
