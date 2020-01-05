import styled from 'styled-components';

export const FormWrapper = styled.div`
  .input-control + .input-control,
  .input-control + .input-group,
  .input-group + .input-group {
    margin-top: 20px;
  }
  .input-group {
    display: flex;
    @media screen and (max-width: 767px) {
      flex-direction: column;
    }
    > .input-control {
      margin-top: 0px;
      flex: 1;
      @media screen and (max-width: 767px) {
        margin-bottom: 20px;
      }
      & + .input-control {
        margin-left: 20px;
        @media screen and (max-width: 767px) {
          margin-left: 0px;
        }
      }
    }
  }
  .input + span {
    color: red;
    display: block;
    margin-top: 5px;
  }
  .label {
    font-weight: bold;
    text-transform: uppercase;
    display: block;
    margin-bottom: 10px;
    span {
      text-transform: none;
    }
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
    &--search {
      padding: 8px 20px 8px 35px;
    }
  }

  .textarea {
    min-height: 127px;
  }

  .input-search {
    position: relative;
    &::before {
      font: normal normal normal 14px/1 FontAwesome;
      color: #999999;
      content: '\f002';
      display: block;
      position: absolute;
      top: 9px;
      left: 15px;
    }
  }

  .input-select {
    position: relative;

    select {
      -webkit-appearance: none;
      -moz-appearance: none;
      text-indent: 1px;
      text-overflow: '';
    }

    &::before {
      font: normal normal normal 14px/1 FontAwesome;
      color: #999999;
      content: '\f107';
      display: block;
      position: absolute;
      top: 16px;
      right: 15px;
    }
  }
`;
