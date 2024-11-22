"use client";
import { useEffect, useState } from "react";

interface User {
  userid: string;
  userWalletAddress: string;
  profilePic: string;
}

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!users.length) {
    return <p>No users found</p>;
  }

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.userid}>
            {user.userWalletAddress} ({user.profilePic})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
