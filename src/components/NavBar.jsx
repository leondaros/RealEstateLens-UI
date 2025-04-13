import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/feedback">feedback</Link></li>
        <li><Link to="/density">Property Density</Link></li>
        <li><Link to="/PriceMap">Price Map</Link></li>
        <li><Link to="/Location">Location</Link></li>
      </ul>
    </nav>
  );
}

export default NavBar;