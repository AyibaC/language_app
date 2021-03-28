import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";


const Dashboard = ()=>{
    const { user, isAuthenticated, isLoading } = useAuth0();

    return (
        isAuthenticated && <h1>Welcome {user.given_name}</h1>
    )
};

export default Dashboard;