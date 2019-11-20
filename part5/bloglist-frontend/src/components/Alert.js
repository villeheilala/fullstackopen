import React from 'react';
import { Container, Message } from 'semantic-ui-react';

const Alert = ({ text, type }) => (
  <Container>
    <Message className={type} content={text} />
  </Container>
);

export default Alert;
