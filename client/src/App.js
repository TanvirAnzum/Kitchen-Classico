import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { router } from "./routers/router";
import GlobalSpinner from "./ui/GlobalSpinner";
import Layout from "./ui/Layout";
import { setAuth } from "./utils/setAuth";

function App() {
  const auth = getAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setAuth(user);
      setIsLoading(false);
    });
  }, [auth]);

  return isLoading ? (
    <GlobalSpinner />
  ) : (
    <HelmetProvider>
      <AuthProvider>
        <RouterProvider router={router}>
          <Layout />
        </RouterProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
