import React, { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Auth from '../hoc/auth'

import NavBar from "./views/NavBar/NavBar"
import Footer from "./views/Footer/Footer"
import LandingPage from './views/LandingPage/LandingPage'
import LoginPage from './views/LoginPage/LoginPage'
import RegisterPage from './views/RegisterPage/RegisterPage'
import VideoUploadPage from './views/VideoUploadPage/VideoUploadPage'
import DetailVideoPage from "./views/DetailVideoPage/DetailVideoPage"
import SubscriptionPage from "./views/SubscriptionPage/SubscriptionPage"

function App() {
  const AuthLandingPage = Auth(LandingPage, null)
  const AuthLoginPage = Auth(LoginPage, false)
  const AuthRegisterPage = Auth(RegisterPage, false)
  const AuthVideoUploadPage = Auth(VideoUploadPage, true)
  const AuthDetailVideoPage = Auth(DetailVideoPage, null)
  const AuthSubscriptionPage = Auth(SubscriptionPage, null)

  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <Router>
        <NavBar />
          <Routes>
            <Route exact path="/" element={<AuthLandingPage />} />
            <Route exact path="/login" element={<AuthLoginPage />} />
            <Route exact path="/register" element={<AuthRegisterPage />} />
            <Route exact path="/video/upload" element={<AuthVideoUploadPage />} />
            <Route exact path="/video/:videoId" element={<AuthDetailVideoPage />} />
            <Route exact path="/subscription" element={<AuthSubscriptionPage />} />
          </Routes>
        <Footer />
      </Router>
    </Suspense>
  );
}

export default App
