import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">E-Learning</Link>
      </div>
      <nav className="links">
        <Link to="/">Trang Chủ</Link>
        <Link to="/courses">Khóa Học</Link>
        <Link to="/about">Giới Thiệu</Link>
        <Link to="/account">Tài Khoản</Link>
      </nav>
    </header>
  );
};

export default Header;
