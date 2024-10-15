import { Navigate } from "react-router-dom";
import useUserStore from "../../store/userStore";

const Public = (props) => {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  return isLoggedIn ? <Navigate to="/" /> : <>{props.children}</>;
};

export default Public;
