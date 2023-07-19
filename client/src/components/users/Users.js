import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import {useAuthUser} from 'react-auth-kit'

import ListUsers from "./list-users/ListUsers";

const Users = () => {
    const auth = useAuthUser();
    const managerData = {
        role: auth().role,
        id: auth().id
    }
    const [data, setData] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        try {
            const fetchData = async () => {
                const res = await axios.get('http://localhost:5000/api/users/', {params: {id: managerData.id, role: managerData.role}}).catch((error) => {
                    setErrorMessage(error.response.data?.message);
                    setError(true);
                    throw new Error(error.response.data?.message);
                  });
                  if(!error) {
                    setData(res.data);
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

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/dashboard/users/add-user');
    }
    return (
        <div>
            <Button variant='falcon-primary' className='me-2 mb-1' onClick={handleClick}>Add User</Button>
            <ListUsers data={data}/>
        </div>
    )
}

export default Users;