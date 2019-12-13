import styled from 'styled-components';

export const Container = styled.header`
  padding: 0px 20px;
  background-color: #fff;
  height: 64px;
  border-bottom: 1px solid #dddddd;
  margin-bottom: 40px;

  > .area-center {
    max-width: 1264px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    height: 100%;

    .area-logo {
      margin-right: 30px;
    }

    .area-nav {
      flex: 1;
      padding: 0px 20px;
      border-left: 1px solid #dddddd;

      ul {
        list-style: none;
        display: flex;
        li {
          text-transform: uppercase;
          a {
            padding: 10px;
            display: block;
            text-decoration: none;
            color: #999999;
            font-weight: bold;
            &:hover,
            &.active {
              color: #444444;
            }
          }
        }
      }
    }

    .area-user {
      text-align: right;
      .feature {
        display: block;
        font-weight: bold;
      }
      a {
        color: #ee4d64;
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
`;
