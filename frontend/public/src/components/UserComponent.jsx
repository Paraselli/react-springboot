import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8080/api/users";

function UserComponent() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Fetch users
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_URL);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Add user
  const addUser = async () => {
    if (!name || !email) return;

    try {
      await axios.post(API_URL, { name, email });
      setName("");
      setEmail("");
      fetchUsers(); // refresh list
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>User Management</h2>

      {/* Add User Form */}
      <div>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={addUser}>Add User</button>
      </div>

      {/* User List */}
      <h3>User List</h3>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserComponent;
