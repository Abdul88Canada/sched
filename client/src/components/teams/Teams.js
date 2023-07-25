import React, { useState, useEffect, } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom'; 

import teams from "api/teams";
import ListTeams from "./list-teams/ListTeams";

const Teams = () => {
    const authHeader = useAuthHeader();

    const [data, setData] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        try {
            const fetchData = async () => {
                const res = await teams.get('/', {
                    headers: {
                        Authorization: authHeader() // Set the token in the 'Authorization' header
                    }
                    }).catch((error) => {
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

    const handleClick = () => {
        navigate('/dashboard/teams/add-team');
    }

    return (
        <div>
            Teams
            <Button variant='falcon-primary' className='me-2 mb-1' onClick={handleClick}>Add Team</Button>
            <ListTeams  data={data} />
            {errorMessage}
        </div>
    )
}

export default Teams;