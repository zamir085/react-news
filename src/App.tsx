import Header from './components/Header'
import Footer from './components/Footer'
import NewsDetail from './components/NewsDetail'
import NewsList from './components/NewsList'
import Home from './pages/Home'
import Login from './pages/Login'
import Post from './pages/Post'
import Register from './pages/Register'
import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/newslist" element={<NewsList />} />
        <Route path="/post" element={<Post />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
