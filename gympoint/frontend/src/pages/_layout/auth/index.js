import React from 'react';
import PropTypes from 'prop-types';

import Header from '../../../components/Header';
import Container from '../../../components/Container';

export default function Auth({ children }) {
  return (
    <Container>
      <Header />
      {children}
    </Container>
  );
}

Auth.propTypes = {
  children: PropTypes.element.isRequired,
};
