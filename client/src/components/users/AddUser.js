import React from 'react';
import { Col, Row } from 'react-bootstrap';

import AddUserForm from './AddUserForm';

const AddUser = () => (
  <>
    <Row className="align-items-center mb-2">
      <Col>
        <h5 id="modalLabel">Add User</h5>
      </Col>
    </Row>
    <AddUserForm />
  </>
);

export default AddUser;