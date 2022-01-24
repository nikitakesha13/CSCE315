import React from 'react';
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Navbar from "./components/navbar.component";
import Home from "./components/home.component";
import CreateUser from "./components/create-user.component";
import LogIn from "./components/login.component";
import Browse from "./components/browse.component";
import Matches from "./components/matches.component";
import UserSettings from './components/usersettings.component';
import Accessibility from './components/accessibility.component';
import DogSettings from './components/dogsettings.component';
import styled, { ThemeProvider } from 'styled-components';
import {lightTheme, darkTheme, GlobalStyles} from './themes.js';
// import './App.css';

const StyledApp = styled.div`
  color: ${(props) => props.theme.fontColor};
`

function App() {

  if(!localStorage.getItem('theme')){
    localStorage.setItem('theme', 'light');
  }

  return (
    <div>
      <ThemeProvider theme={localStorage.getItem('theme') === 'light' ? lightTheme : darkTheme}>
        <GlobalStyles />
        <StyledApp>
          <Navbar /> 
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LogIn />} />
              <Route path="/create_user" element={<CreateUser />} />
              <Route path="/browse" element={<Browse />} />
              <Route path="/matches" element={<Matches />} />
              <Route path="/usersettings" element={<UserSettings />} />
              <Route path="/dogsettings" element={<DogSettings />} />
              <Route path="/accessibility" element={<Accessibility />} />
            </Routes>
          </main>
          </StyledApp>
        </ThemeProvider>
    </div>
  );
}

export default App;