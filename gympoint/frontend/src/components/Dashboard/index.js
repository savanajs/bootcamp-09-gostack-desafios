import React, { Component } from 'react';

import Header from '../Header';
import Container from '../Container';

export default class Dashboard extends Component {
  render() {
    return (
      <Container>
        <Header />
        {this.props.children}
      </Container>
    );
  }
}
