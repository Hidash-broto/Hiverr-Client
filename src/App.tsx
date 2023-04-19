import React, {Suspense} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLogin from './pages/admin/AdminLogin'
import Login from './pages/Login'
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
            <ClientHome />
          } />

          <Route path='/admin/login' element={
            <PublicRouteAdmin>
              <AdminLogin />
            </PublicRouteAdmin>
          } />

          <Route path='/signup' element={
            <SelectingPage />
          } />

          <Route path='/client/signup' element={<Signup />} />

          <Route path='/login' element={<Login />} />
          <Route path='/freelancer/signup' element={<FreelanserSignup />} />
          <Route path='/admin' element={
            <ProtectedRoute>
              <AdminLayout>
                <Suspense fallback={<Loading/>}>
                <UsersList />
                </Suspense>
              </AdminLayout>
            </ProtectedRoute>
          } />

          <Route path='/SignupAfterAuth' element={<SignupAfterAuth />} />

          <Route path='/freelancer/home' element={<FreelancerHome />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
