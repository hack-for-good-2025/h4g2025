import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./Contexts/AuthContext";
import ProtectedRoute from "./Pages/ProtectedRoute";

import Navigation from "./Components/Navigation";
import SpinnerFull from "./Components/SpinnerFull";
import CalenderPage from "./Pages/CalenderPage.tsx";

const HomePage = lazy(() => import("./Pages/HomePage"));
const Login = lazy(() => import("./Pages/Login"));
const PageNotFound = lazy(() => import("./Pages/PageNotFound"));
const CreateUser = lazy(() => import("./Pages/CreateUser"));

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <header>
          <Navigation />
        </header>
        <Suspense fallback={<SpinnerFull />}>
          <Routes>
            <Route index element={<HomePage />} />
            <Route
              path="calender"
              element={
                <ProtectedRoute>
                  <CalenderPage />
                </ProtectedRoute>
              }
            />
            <Route path="login" element={<Login />} />
            <Route path="create" element={<CreateUser />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
