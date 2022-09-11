import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';
import mainLogo from './favicon.ico';
import { MemoryRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/AuthProvider';
import UnauthorizedView from './views/unauthorized/UnauthorizedView';
import LoginView from './views/login/LoginView';
import HomeView from './views/home/HomeView';


const Wrapper = ({ children, doc }) => (
  <Fragment>
    <AuthProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <link rel="icon" type="image/x-icon" href={mainLogo} />
      </Helmet>
      <MemoryRouter>
        <Routes>
          <Route path="/">
            {/* Public routes */}
            <Route path="unauthorized" element={<UnauthorizedView />} />
            <Route path="login" element={<LoginView />} />

            {/* Private routes */}
            <Route path="/" element={<HomeView>{children}</HomeView>} />
          </Route>
        </Routes>
      </MemoryRouter>
    </AuthProvider>
  </Fragment>
);
export default Wrapper;
