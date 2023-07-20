import { Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom'; 

const Teams = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/dashboard/teams/add-team');
    }

    return (
        <div>
            Teams
            <Button variant='falcon-primary' className='me-2 mb-1' onClick={handleClick}>Add Team</Button>
        </div>
    )
}

export default Teams;