export const addUserPermission = (permissions) => {
    return (req, res, next) => {
        const role = req.body.role
        if(permissions.includes(role)) {
            next();
        }
        else {
            return res.status(401).json('Unauthorized');
        }
    }
}

export const deleteUserPermission = (permissions) => {
    return (req, res, next) => {
        const role = req.body.role;
        const users = req.body.users;
        const id = req.params.id
        if(permissions.includes(role) && users?.includes(id)) {
            next();
        }
        else {
            return res.status(401).json('Unauthorized');
        }
    }
}

export const getUserPermission = (permissions) => {
    return (req, res, next) => {
        const role = req.body.role;
        const users = req.body.users;
        const id = req.params.id
        const user_id = req.body.id;

        if((permissions.includes(role) && users?.includes(id)) || id == user_id) {
            next();
        }
        else {
            return res.status(401).json('Unauthorized');
        }
    }
}

export const listUsersPermission = (permissions) => {
    return (req, res, next) => {
        const role = req.body.role;

        if(permissions.includes(role)) {
            next();
        }
        else {
            return res.status(401).json('Unauthorized');
        }
    }
}

