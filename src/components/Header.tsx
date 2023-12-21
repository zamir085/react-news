import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import Logo from '../../public/ico.png';
import Typewriter from "typewriter-effect"

const { Header } = Layout;

const Navbar: React.FC = () => {
  return (
    <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(90deg, rgba(16,191,219,1) 0%, rgba(98,27,74,1) 7%, rgba(12,48,90,1) 11%, rgba(12,50,90,1) 27%, rgba(123,55,113,1) 38%, rgba(163,194,32,1) 50%, rgba(66,175,227,1) 70%, rgba(255,0,108,1) 99%)' }}>
      <Link to='/' style={{ display: 'flex' ,alignItems:'center',gap:'20px'}}>
        <img src={Logo} alt="Logo" style={{ width: '50px', height: '50px',}} />
        <p style={{fontSize:'20px',color:'#FFF8DC'}}>
        <Typewriter 
                options={{
                  strings: ['Guliyev Zamir'],
                  autoStart: true,
                  loop: true,
                }}
              />
        </p>
      </Link>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['home']}
        style={{ lineHeight: '64px', width: '30%', backgroundColor: 'transparent' }} 
      >
        <Menu.Item key="home" style={{ color: '#FFF8DC' }}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="post" style={{ color: '#FFF8DC' }}>
          <Link to="/post">Post</Link>
        </Menu.Item>
        <Menu.Item key="newslist" style={{ color: '#FFF8DC' }}>
          <Link to="/newslist">NewsList</Link>
        </Menu.Item> <Menu.Item key="publishers" style={{ color: '#FFF8DC' }}>
          <Link to="/publishers">Publishers</Link>
        </Menu.Item>
        <Menu.Item key="login" style={{ color: '#FFF8DC' }}>
          <Link to="/login">Login</Link>
        </Menu.Item>
        <Menu.Item key="register" style={{ color: '#FFF8DC' }}>
          <Link to="/register">Register</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default Navbar;
