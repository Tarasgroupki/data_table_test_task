import React, { useState, useEffect } from 'react';
import { useHttp } from "../../hooks/http.hook";
import * as process from "process";

interface UserData {
    email: string;
    password: string;
    aboutMe?: string;
    address?: string;
    dateOfBirth?: string;
}

const DataTable: React.FC = () => {
    const [users, setUsers] = useState<UserData[]>([]);

    const { loading, request } = useHttp();

    const getUsers = async () => {
        try {
            const response = await request(`${process.env.REACT_APP_BACKEND_URL}/users`, 'GET', null, {});
            setUsers(response);
        } catch (err) {
            throw err;
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div>
            <h2>User Data Table</h2>
            {loading ? (
                <p>Loading data...</p>
            ) : (
                <table>
                    <thead>
                    <tr>
                        <th>Email</th>
                        <th>About Me</th>
                        <th>Address</th>
                        <th>Birthdate</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{user.email}</td>
                            <td>{user.aboutMe}</td>
                            <td>{user.address}</td>
                            <td>{user.dateOfBirth && new Date(user.dateOfBirth).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default DataTable;