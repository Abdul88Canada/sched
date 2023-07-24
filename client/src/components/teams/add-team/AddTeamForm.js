import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuthHeader } from 'react-auth-kit'

import users from "api/users";
import teams from "api/teams";


const AddTeamForm = ({ hasLabel }) => {
    const authHeader = useAuthHeader();
    const [usersListData, setUsersListData] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);

    useEffect(() => {
        try {
            const fetchData = async () => {
                const res = await users.get('/', {
                    headers: {
                        Authorization: authHeader() // Set the token in the 'Authorization' header
                    }
                    }).catch((error) => {
                    setErrorMessage(error.response.data?.message);
                    setError(true);
                    throw new Error(error.response.data?.message);
                  });
                  if(!error) {
                    setUsersListData(res.data.result);
                }
            }
            fetchData().catch((error) => {
                setErrorMessage(error.response.data?.message);
                setError(true);
                throw new Error(error.response.data?.message);
              });
          } catch(err) {
            setError(false);
          }
      }, []);
      

    // State
    const [formData, setFormData] = useState({
      name: '',
      members: []
});

const [errorMessage, setErrorMessage] = useState('');
const [error, setError] = useState(false);

const navigate = useNavigate();

  // Handler
  const handleSubmit = async e => {
    e.preventDefault();
    console.log('Submitted')
    try {
      const res = await teams.post('/',  formData, {headers: {
        Authorization: authHeader() // Set the token in the 'Authorization' header
        }
        }).catch((error) => {
        setErrorMessage(error.response.data.message);
        setError(true);
        throw new Error(error.response.data.message);
      });
      if(!error) {
        toast.success(`Successfully Added Team ${formData.name}`, {
          theme: 'colored'
        });
        navigate('/dashboard/teams');
      }
    } catch(err) {
      setError(false);
    }
  };

  const handleCheckboxChange = (e) => {
    const userId = e.target.value;
    const isChecked = e.target.checked;
  
    setSelectedUsers((prevSelected) =>
      isChecked
        ? [...prevSelected, userId]
        : prevSelected.filter((id) => id !== userId)
    );
  
    setFormData({
      ...formData,
      members: isChecked ? [...selectedUsers, userId] : selectedUsers.filter((id) => id !== userId)
    });
  
    console.log(selectedUsers);
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
        {hasLabel && <Form.Label>Team Name</Form.Label>}
        <Form.Control
          placeholder={!hasLabel ? 'Team Name' : ''}
          value={formData.name}
          name="name"
          onChange={handleFieldChange}
          type="text"
        />
      </Form.Group>
      <Form.Group className="mb-2">
        {hasLabel && <Form.Label>Members</Form.Label>}
        {usersListData.map((user) => (
                  <Form.Check 
                  placeholder={!hasLabel ? 'Team members' : ''}
                  value={user.email}
                  name="members"
                  onChange={handleCheckboxChange}
                  type="checkbox"
                  label={`${user.email}`}
                  key={user.email}
                />
        ))}
      </Form.Group>
      <Form.Group className="mb-4">
        <Button
          className="w-100"
          type="submit"
          disabled={
            !formData.name
          }
        >
          Add Team
        </Button>
      </Form.Group>
      {errorMessage}
    </Form>
    )
}

AddTeamForm.propTypes = {
    hasLabel: PropTypes.bool
  };

export default AddTeamForm;