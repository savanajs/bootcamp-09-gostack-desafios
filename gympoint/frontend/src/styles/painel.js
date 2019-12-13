import styled from 'styled-components';

export const Painel = styled.div`
  .list__header {
    display: flex;
    margin-bottom: 25px;
    .col-left {
      flex: 1;
    }
    .col-right {
      display: flex;
      .area-button {
        margin-right: 15px;
      }
      form {
        .input {
          width: 237px;
        }
      }
    }
  }

  .list__content {
    .card {
      padding: 20px 25px;
    }
  }

  table {
    width: 100%;
    text-align: left;
    border-collapse: collapse;
    thead > tr > th {
      text-transform: uppercase;
    }
    thead > tr > th {
      padding: 14px 0px 5px 0px;
    }
    tbody > tr > td {
      padding: 14px 0px;
    }
    tbody tr + tr {
      border-top: 1px solid #eeeeee;
    }
    .center {
      text-align: center;
    }
    .right {
      text-align: right;
    }
    tbody > tr > td {
      color: #666666;
    }
    .item-large {
      width: 38%;
    }
    .actions {
      a {
        text-decoration: none;
        + a {
          margin-left: 20px;
        }
      }
      .edit {
        color: #4d85ee;
      }
      .delete {
        color: #de3b3b;
      }
    }
  }
`;
