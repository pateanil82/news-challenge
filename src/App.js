import './App.css';
import Articles from './components/Articles';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import NewsOrg from './components/NewsOrg';
import NewYorkTimes from './components/NewYorkTimes';
import TheGuardianNews from './components/TheGuardianNews';
import Header from './components/Header';
import { Container } from '@mui/material';
import Footer from './components/Footer';

function App() {
  return (
    <>
    <Header/>
    <Container sx={{minHeight:"600px", paddingTop: "50px", paddingBottom: "50px"}}>
    <Router>
    <Routes>
      <Route path="/" element={<Articles />} />
      <Route path="/newsall" element={<NewsOrg />} />
      <Route path="/nynewsall" element={<NewYorkTimes />} />
      <Route path="/guardiannews" element={<TheGuardianNews />} />
    </Routes>
  </Router>
  </Container>
  <Footer/>
  </>
  );
}

export default App;
