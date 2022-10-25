import React from 'react';
import * as Bs from 'react-bootstrap';

interface IAlert {
  title?: string;
  body?: string;
}

export const Alert = ({ title, body }: IAlert) => {
  return (
    <Bs.Alert variant="danger">
      <Bs.Alert.Heading>{title}</Bs.Alert.Heading>
      <p>{body}</p>
    </Bs.Alert>
  );
};
