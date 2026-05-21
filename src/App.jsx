import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Login from "./Login";
import CreateAccount from "./CreateAccount";
import Welcome from "./Welcome";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const handleRegister = (newUser) => {
    setUsers((prev) => [...prev, newUser]);
  };

  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <div className="app-shell">
      <Header user={currentUser} onLogout={handleLogout} />

      <main className="main">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route
            path="/login"
            element={<Login users={users} onLogin={handleLogin} />}
          />

          <Route
            path="/register"
            element={
              <CreateAccount
                users={users}
                onRegister={handleRegister}
                onLogin={handleLogin}  
              />
            }
          />

          <Route
            path="/welcome"
            element={
              currentUser
                ? <Welcome user={currentUser} />
                : <Navigate to="/login" replace />
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;