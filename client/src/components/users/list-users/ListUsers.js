import UserInfo from "./UserInfo";

const ListUsers = ({data}) => {
    return(
        <div>
            <UserInfo data={data}/>
        </div>
    )
}

export default ListUsers;