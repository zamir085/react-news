import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import Logo from '../../public/ico.png';

const { Header } = Layout;

const Navbar: React.FC = () => {
  return (
    <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#5b919e' }}>
      <div style={{ display: 'flex' }}>
        <img src={Logo} alt="Logo" style={{ width: '50px', height: '50px',}} />
      </div>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['home']}
        style={{ lineHeight: '64px', width: '30%', backgroundColor: 'transparent' }} 
      >
        <Menu.Item key="home" style={{ color: '#00474f' }}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="post" style={{ color: '#00474f' }}>
          <Link to="/post">Post</Link>
        </Menu.Item>
        <Menu.Item key="newslist" style={{ color: '#00474f' }}>
          <Link to="/newslist">NewsList</Link>
        </Menu.Item> <Menu.Item key="publishers" style={{ color: '#00474f' }}>
          <Link to="/publishers">Publishers</Link>
        </Menu.Item>
        <Menu.Item key="login" style={{ color: '#00474f' }}>
          <Link to="/login">Login</Link>
        </Menu.Item>
        <Menu.Item key="register" style={{ color: '#00474f' }}>
          <Link to="/register">Register</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default Navbar;
