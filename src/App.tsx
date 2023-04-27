import React, {Suspense} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLogin from './pages/admin/AdminLogin'
import Login from './pages/Login'
import { ErrorBoundary } from "react-error-boundary";
import { Toaster } from 'react-hot-toast';
import PublicRouteAdmin from './components/PublicRouteAdmin'
import ProtectedRoute from './components/ProtectedRoute'
import ClientHome from './pages/client/CientHome'
import SelectingPage from './pages/client/SelectingPage';
import Signup from './pages/client/Signup';
import FreelanserSignup from './pages/freelancer/FreelancerSignup'
import AdminLayout from './components/AdminLayout';
import SignupAfterAuth from './pages/SignupAfterAuth'
import FreelancerHome from './pages/freelancer/FreelancerHome';
import Loading from './components/Loading';
import FallbackErrorBoundary from './components/FallbackErrorBoundary';
import FreelancerGigCreation from './pages/freelancer/FreelancerGigCreation';
import PublicRouteUser from './components/PublicRouteUser';
import ProtectedRouteUser from './components/ProtectedRouteUser';
import Overview from './components/gigCreationComponents/Overview';
import Pricing from './components/gigCreationComponents/Pricing';

const UsersList = React.lazy(() => import("./components/UsersList"));

function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster position='top-center' reverseOrder={false} />
        <Routes>

          <Route path='/' element={
            <ErrorBoundary fallbackRender={FallbackErrorBoundary}>
              <ProtectedRouteUser>
              <ClientHome />
              </ProtectedRouteUser>
            </ErrorBoundary>
          } />

          <Route path='/admin/login' element={
          <ErrorBoundary fallbackRender={FallbackErrorBoundary}>
            <PublicRouteAdmin>
              <AdminLogin />
            </PublicRouteAdmin>
          </ErrorBoundary>
          } />

          <Route path='/signup' element={
          <ErrorBoundary fallbackRender={FallbackErrorBoundary}>
            <SelectingPage />
          </ErrorBoundary>
          } />

          <Route path='/client/signup' element={
          <ErrorBoundary fallbackRender={FallbackErrorBoundary}>
            <Signup />
          </ErrorBoundary>
          } />

          <Route path='/login' element={
           <ErrorBoundary fallbackRender={FallbackErrorBoundary}>
            <PublicRouteUser>
            <Login />  
          </PublicRouteUser>
             
           </ErrorBoundary>
          } />
          <Route path='/freelancer/signup' element={<FreelanserSignup />} />
          <Route path='/admin' element={
          <ErrorBoundary fallbackRender={FallbackErrorBoundary}>
            <ProtectedRoute>
              <AdminLayout>
                <Suspense fallback={<Loading/>}>
                <UsersList />
                </Suspense>
              </AdminLayout>
            </ProtectedRoute>
          </ErrorBoundary>    
          } />

          <Route path='/SignupAfterAuth' element={
            <ErrorBoundary fallbackRender={FallbackErrorBoundary}>
              <SignupAfterAuth />
            </ErrorBoundary>
          } />

          <Route path='/freelancer/home' element={
            <ErrorBoundary fallbackRender={FallbackErrorBoundary}>
              <ProtectedRouteUser>
              <FreelancerHome />
              </ProtectedRouteUser>
            </ErrorBoundary>
          } />

          <Route path='/freelancer/gigCreation' element= {
            <ErrorBoundary fallbackRender={FallbackErrorBoundary}>
              <FreelancerGigCreation>
                <Overview />
                <Pricing />
              </FreelancerGigCreation>
            </ErrorBoundary>
          } />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
