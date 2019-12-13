import styled from 'styled-components';

export const Form = styled.form`
  .input-control + .input-control {
    margin-top: 20px;
  }
  .label {
    font-weight: bold;
    text-transform: uppercase;
    display: block;
    margin-bottom: 10px;
  }
  .input {
    border-radius: 4px;
    border: 1px solid #dddddd;
    width: 100%;
    &--large {
      padding: 14px;
    }
    &--normal {
      padding: 8px 20px;
    }
  }
`;
