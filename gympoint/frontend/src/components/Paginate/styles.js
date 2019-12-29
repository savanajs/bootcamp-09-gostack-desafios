import styled from 'styled-components';

export const Pagination = styled.div`
  width: 100%;
  margin-top: 40px;
  text-align: center;
  button + button {
    margin-left: 10px;
  }

  button {
    border: none;
    background-color: transparent;
    cursor: pointer;
    color: #ee4d64;
    font-weight: bold;
  }

  button:disabled {
    color: #ccc;
    cursor: default;
  }
`;
