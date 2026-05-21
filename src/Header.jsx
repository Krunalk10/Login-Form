import { useNavigate } from "react-router-dom";

function Header({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/login"); 
  };

  return (
    <header className="header">
     

      <nav className="header-nav">
        {user ? (
          <>
            <a href="#">Home</a>
            <a href="#">Settings</a>
            <button className="header-btn" onClick={handleLogout}>
              Log out
            </button>
          </>
        ) : (
          <>
           
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;