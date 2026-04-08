
import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");

  const load = () => {
    fetch("http://localhost:8080/api/users")
      .then(r => r.json())
      .then(setUsers);
  };

  useEffect(() => { load(); }, []);

  const addUser = () => {
    fetch("http://localhost:8080/api/users", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({name})
    }).then(load);
  };

  const deleteUser = (id) => {
    fetch(`http://localhost:8080/api/users/${id}`, {
      method: "DELETE"
    }).then(load);
  };

  return (
    <div>
      <h1>User Management</h1>
      <input value={name} onChange={e=>setName(e.target.value)} />
      <button onClick={addUser}>Add</button>

      <ul>
        {users.map(u => (
          <li key={u.id}>
            {u.name}
            <button onClick={()=>deleteUser(u.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
