import React, {Suspense} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLogin from './pages/admin/AdminLogin'
import Login from './pages/Login'
import { ErrorBoundary } from "react-error-boundary";
import { Toaster } from 'react-hot-toast';
import PublicRouteAdmin from './component/PublicRouteAdmin'
import ProtectedRoute from './component/ProtectedRoute'
import ClientHome from './pages/client/CientHome'
import SelectingPage from './pages/client/SelectingPage';
import Signup from './pages/client/Signup';
import FreelanserSignup from './pages/freelancer/FreelancerSignup'
import AdminLayout from './component/AdminLayout';
import SignupAfterAuth from './pages/SignupAfterAuth'
import FreelancerHome from './pages/freelancer/FreelancerHome';
import Loading from './component/Loading';
import FallbackErrorBoundary from './component/FallbackErrorBoundary';
const UsersList = React.lazy(() =>
  import("./component/UsersList")
);

function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster position='top-center' reverseOrder={false} />
        <Routes>

          <Route path='/' element={
            <ErrorBoundary fallbackRender={FallbackErrorBoundary}>
            <ClientHome />
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
             <Login />
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
              <FreelancerHome />
            </ErrorBoundary>
          } />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
