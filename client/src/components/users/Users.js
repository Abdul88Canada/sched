import { Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

const Users = () => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/dashboard/users/add-user');
    }
    return (
        <div>
            <Button variant='falcon-primary' className='me-2 mb-1' onClick={handleClick}>Add User</Button>
        </div>
    )
}

export default Users;