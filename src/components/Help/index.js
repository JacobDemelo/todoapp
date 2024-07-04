import { Link, Outlet } from "react-router-dom";
import './styles.scss';

function Help() {
  return (
    <div className="help-component">
      <h1>Help</h1>
      <Outlet />

      <nav>
        <ul>
          <li><Link to='/help'>Introduction</Link></li>
          <li><Link to='/help/add'>Adding Tasks</Link></li>
          <li><Link to='/help/remove'>Removing Tasks</Link></li>
          <li><Link to='/help/change'>Changing Status</Link></li>
        </ul>
      </nav>
    </div>
  )
}

export default Help;
