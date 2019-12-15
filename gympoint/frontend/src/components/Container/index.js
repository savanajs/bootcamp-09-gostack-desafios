import styled from 'styled-components';

const Container = styled.div`
  background-color: #f5f5f5;
  height: 100vh;

  .list__header {
    display: flex;
    margin-bottom: 25px;
    .col-left {
      flex: 1;
    }
    .col-right {
      display: flex;
      .area-button {
        display: flex;
      }
      .area-buttons {
        display: flex;
        .btn + .btn {
          margin-left: 10px;
        }
      }
      form {
        margin-left: 15px;
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

  .content {
    > .card {
      padding: 30px;
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
      width: 20%;
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

  .fa-check-circle {
    color: #cccccc;
    &.active {
      color: #42cb59;
    }
  }
`;

export default Container;
