import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { setAuth } from "../utils/setAuth";

const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { accessToken, providerData } = user;
        setUser({ accessToken, user: providerData[0] });
        setAuth(user);
      } else setUser(null);
    });
  }, []);

  return user;
};

export default useAuth;
