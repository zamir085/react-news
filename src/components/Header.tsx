import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import Logo from '../../public/ico.png';
import Typewriter from 'typewriter-effect';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {  logout, updateLoggedInState } from '../store/slices/userTypeSlice';

const { Header } = Layout;

const Navbar: React.FC = () => {
  const [user, setUser] = useState<string | null>(null);
  const [publisher, setPublisher] = useState<string | null>(null);
  const dispatch = useDispatch();
  const userType = useSelector((state: RootState) => state.userType.userType);

  useEffect(() => {
    dispatch(updateLoggedInState(!!localStorage.getItem('user') || !!localStorage.getItem('publisher')));
  }, []);

  useEffect(() => {
    setUser(localStorage.getItem('user'));
    setPublisher(localStorage.getItem('publisher'));
  }, [userType]);


  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('publisher');
    dispatch(logout());
    setUser(null);
    setPublisher(null);
  };
  return (
    <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(90deg, rgba(16,191,219,1) 0%, rgba(98,27,74,1) 7%, rgba(12,48,90,1) 11%, rgba(12,50,90,1) 27%, rgba(123,55,113,1) 38%, rgba(163,194,32,1) 50%, rgba(66,175,227,1) 70%, rgba(255,0,108,1) 99%)' }}>
      <Link to='/' style={{ display: 'flex', alignItems: 'center', gap: '20px', color: '#FFF8DC' }}>
        <img src={Logo} alt="Logo" style={{ width: '50px', height: '50px' }} />
        <p style={{ fontSize: '20px', color: '#FFF8DC' }}>
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
        style={{ lineHeight: '64px',  backgroundColor: 'transparent' }}
      >
        {(user || publisher) ? (
          <>
            <Menu.Item key="home">
              <Link to="/" style={{ color: '#FFF8DC' }}>Home</Link>
            </Menu.Item>
            {user && (
              <>
                <Menu.Item key="newslist">
                  <Link to="/newslist" style={{ color: '#FFF8DC' }}>NewsList</Link>
                </Menu.Item>
              </>
            )}
            {publisher && (
              <>
                <Menu.Item key="publishers">
                  <Link to="/publishers" style={{ color: '#FFF8DC' }}>Publishers</Link>
                </Menu.Item>
                <Menu.Item key="post">
                  <Link to="/post" style={{ color: '#FFF8DC' }}>Post</Link>
                </Menu.Item>
              </>
            )}
            <Menu.Item key="logout" onClick={handleLogout}>
              Logout
            </Menu.Item>
          </>
        ) : (
          <>
            <Menu.Item key="home">
              <Link to="/" style={{ color: '#FFF8DC' }}>Home</Link>
            </Menu.Item>
            <Menu.Item key="login">
              <Link to="/login" style={{ color: '#FFF8DC' }}>Login</Link>
            </Menu.Item>
            <Menu.Item key="register">
              <Link to="/register" style={{ color: '#FFF8DC' }}>Register</Link>
            </Menu.Item>
          </>
        )}
      </Menu>
    </Header>
  );
};

export default Navbar;
