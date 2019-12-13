import { createGlobalStyle } from 'styled-components';
import { darken } from 'polished';

export default createGlobalStyle`
  @import url('https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    min-height: 100%
  }

  body {
    -webkit-font-smoothing: antialiased !important;
  }

  .signin-page {
    background-color: #ee4d64;
    height: 100vh;
  }

  .painel {
    background-color: #f5f5f5;
    height: 100vh;
  }

  body, input, button {
    color: #222;
    font-size: 14px;
    font-family: 'Roboto', sans-serif;
  }

  .card {
    background-color: #fff;
    border-radius: 5px;
  }

  .shell {
    padding: 0px 20px;  
    margin: 0 auto;
    &:not(.shell--small){
      max-width: 1200px;
    }
    &--small {
      max-width: 900px;
    }
  }

  .anwser {
    margin-bottom: 20px;
    h2 {
      color: #222;
      font-size: 14px;
      margin-bottom: 10px;
      text-transform: uppercase;
    }
  }

  .modal-close {
    position: absolute;
    right: 15px;
    top: 15px;
    font-size: 20px;
    cursor: pointer;
  }

  .btn {
    cursor: pointer;
    width: 100%;
    text-align: center;
    color: #fff;
    border: none;
    border-radius: 4px;
    transition: background 0.2s;
    will-change: background;
    display: flex;
    align-items: center;

    > i {
      margin-right: 10px;
    }

    &--primary {
      background-color: #ee4d64;
      &:hover {
        background-color: ${darken(0.08, '#ee4d64')};
      }
    }

    &--disable {
      background-color: #CCCCCC;
      &:hover {
        background-color: ${darken(0.08, '#CCCCCC')};
      }
    }

    &--large {
      padding: 14px;
      font-weight: bold;
    }

    &--normal {
      padding: 8px 14px;
      text-decoration: none;
      text-transform: uppercase;
    }

    &--center {
      justify-content: center;
    }

  }
`;
