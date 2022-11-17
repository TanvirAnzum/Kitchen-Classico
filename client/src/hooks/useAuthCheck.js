import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const useAuthCheck = () => {
  const auth = useContext(AuthContext);
  if (auth?.accessToken) return true;
  else return false;
};

export default useAuthCheck;
