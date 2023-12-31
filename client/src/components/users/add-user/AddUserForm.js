import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuthHeader } from 'react-auth-kit'

import users from "api/users";


const AddUserForm = ({ hasLabel }) => {
    const authHeader = useAuthHeader();

    // State
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
});

const [errorMessage, setErrorMessage] = useState('');
const [error, setError] = useState(false);

const navigate = useNavigate();

  // Handler
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await users.post('/',  formData, {headers: {
        Authorization: authHeader() // Set the token in the 'Authorization' header
        }
        }).catch((error) => {
        setErrorMessage(error.response.data.message);
        setError(true);
        throw new Error(error.response.data.message);
      });
      if(!error) {
        toast.success(`Successfully Added user ${formData.name}`, {
          theme: 'colored'
        });
        navigate('/dashboard/users');
      }
    } catch(err) {
      setError(false);
    }
  };

  const handleFieldChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


    return (
        <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        {hasLabel && <Form.Label>Name</Form.Label>}
        <Form.Control
          placeholder={!hasLabel ? 'Name' : ''}
          value={formData.name}
          name="name"
          onChange={handleFieldChange}
          type="text"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        {hasLabel && <Form.Label>Email address</Form.Label>}
        <Form.Control
          placeholder={!hasLabel ? 'Email address' : ''}
          value={formData.email}
          name="email"
          onChange={handleFieldChange}
          type="text"
        />
      </Form.Group>

      <Row className="g-2 mb-3">
        <Form.Group as={Col} sm={6}>
          {hasLabel && <Form.Label>Password</Form.Label>}
          <Form.Control
            placeholder={!hasLabel ? 'Password' : ''}
            value={formData.password}
            name="password"
            onChange={handleFieldChange}
            type="password"
          />
        </Form.Group>
        <Form.Group as={Col} sm={6}>
          {hasLabel && <Form.Label>Confirm Password</Form.Label>}
          <Form.Control
            placeholder={!hasLabel ? 'Confirm Password' : ''}
            value={formData.confirmPassword}
            name="confirmPassword"
            onChange={handleFieldChange}
            type="password"
          />
        </Form.Group>
      </Row>

      <Form.Group className="mb-4">
        <Button
          className="w-100"
          type="submit"
          disabled={
            !formData.name ||
            !formData.email ||
            !formData.password ||
            !formData.confirmPassword 
          }
        >
          Add User
        </Button>
      </Form.Group>
      {errorMessage}
    </Form>
    )
}

AddUserForm.propTypes = {
    hasLabel: PropTypes.bool
  };

export default AddUserForm;