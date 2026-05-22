import { useState } from "react";
import axios from "axios";

function App() {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [token, setToken] =
    useState("");

  const login = async () => {
    try {
      const res = await axios.post(
        "https://fullstack-task-manager-backend-fmuv.onrender.com/api/v1/auth/login",
        {
          email,
          password,
        }
      );

      setToken(res.data.token);

      alert("Login successful");
    } catch (error) {
      alert("Login failed");
    }
  };

  const createTask = async () => {
    try {
      await axios.post(
        "https://fullstack-task-manager-backend-fmuv.onrender.com/api/v1/tasks",
        {
          title: "Frontend Task",
          description:
            "Created from frontend",
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      alert("Task created");
    } catch (error) {
      alert("Task creation failed");
    }
  };

  return (
    <div
      style={{
        padding: "40px",
      }}
    >
      <h1>
        Backend Assignment
      </h1>

      <input
        placeholder="Email"
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <br />
      <br />

      <input
        placeholder="Password"
        type="password"
        onChange={(e) =>
          setPassword(
            e.target.value
          )
        }
      />

      <br />
      <br />

      <button onClick={login}>
        Login
      </button>

      <br />
      <br />

      <button
        onClick={createTask}
        disabled={!token}
    >
      Create Task
      </button>
    </div>
  );
}

export default App;