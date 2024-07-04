import { Link } from "react-router-dom";

function MainMenu() {
  return (
    <nav>
      <Link to="/">Tasks</Link>
      <Link to="/add">Add</Link>
      <Link to="/help">Help</Link>
    </nav>
  );
}

export default MainMenu;
