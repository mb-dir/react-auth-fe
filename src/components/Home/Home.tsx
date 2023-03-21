import { Link, useNavigate } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
export const Home = () => {
  const logout = useLogout();
  const navigate = useNavigate();

  const logOut = async () => {
    await logout();
    navigate("/linkpage");
  };
  return (
    <section>
      <h1>Home</h1>
      <br />
      <p>You are logged in!</p>
      <br />
      <Link to="/editor">Go to the Editor page</Link>
      <br />
      <Link to="/admin">Go to the Admin page</Link>
      <br />
      <Link to="/lounge">Go to the Lounge</Link>
      <br />
      <Link to="/linkpage">Go to the link page</Link>
      <div className="flexGrow">
        <button onClick={logOut}>Sign Out</button>
      </div>
    </section>
  );
};
