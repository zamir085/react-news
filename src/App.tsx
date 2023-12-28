import Header from './components/Header'
import Footer from './components/Footer'
import NewsDetail from './components/NewsDetail'
import NewsList from './components/NewsList'
import {Home} from './pages/Home'
import Login from './pages/Login'
import Post from './pages/Post'
import Register from './pages/Register'
import NotFound from './components/NotFound'
import PublisherDetail from './components/PublisherDetail'
import Publishers from './components/Publishers'
import UserDetail from './components/UserDetail'
import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import PublisherPage from './components/PublisherPage'

function App() {

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/user" element={<UserDetail />} />
        <Route path="/publisher-page" element={<PublisherPage />} />
        <Route path="/publisher/:id" element={<PublisherDetail />} />
        <Route path="/newslist" element={<NewsList />} />
        <Route path="/post" element={<Post />} />
        <Route path="/publishers" element={<Publishers />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
