import { Link, useNavigate } from "react-router-dom";
import Google from "../assets/img/google_icon.webp";
import { useRef, useState } from "react";
import useUserStore from "../store/userStore";

const Login = () => {
  const [toggleShow, setToggleShow] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const emailInput = useRef();
  const passwordInput = useRef();
  const navigate = useNavigate();

  const login = useUserStore((state) => state.login);

  const setToggleShowHandler = (e) => {
    e.preventDefault();
    setToggleShow(!toggleShow);
  };

  const loginHandler = (e) => {
    e.preventDefault();
    setIsValidEmail(true);
    setIsValidPassword(true);

    const emailVal = emailInput.current.value.trim();
    const passVal = passwordInput.current.value.trim();

    if (emailVal !== "" && passVal !== "") {
      const tempUser = {
        email: emailVal,
        password: passVal,
      };
      login(tempUser);
      navigate("/");
    } else {
      if (emailVal == "") {
        setIsValidEmail(false);
      }
      if (passVal == "") {
        setIsValidPassword(false);
      }
    }
  };

  return (
    <div className="flex justify-center items-center my-12 md:my-52">
      <form
        onSubmit={loginHandler}
        className="w-11/12 md:w-1/2 bg-white p-10 flex flex-col justify-center text-center"
      >
        <h1 className="text-2xl font-bold">Masuk ke Akun</h1>
        <p className="text-sm font-light">
          Yuk, lanjutin belajarmu di videobelajar.
        </p>
        <div className="my-5">
          <div className="flex flex-col items-start mb-3">
            <label htmlFor="email">
              E-Mail <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              ref={emailInput}
              // required
              className="w-full border rounded-md h-10"
            />
            {!isValidEmail && (
              <span className="text-red-500">*Email tidak boleh kosong</span>
            )}
          </div>
          <div className="flex flex-col items-start mb-3 relative">
            <label htmlFor="password">
              Kata Sandi <span className="text-red-500">*</span>
            </label>
            <input
              type={toggleShow ? "text" : "password"}
              name="password"
              id="password"
              ref={passwordInput}
              // required
              className="w-full border rounded-md h-10"
            />
            <button
              onClick={setToggleShowHandler}
              className="absolute top-8 end-2"
            >
              {toggleShow ? (
                <i className="fa-solid fa-eye"></i>
              ) : (
                <i className="fa-solid fa-eye-slash"></i>
              )}
            </button>
            {!isValidPassword && (
              <span className="text-red-500">*Password tidak boleh kosong</span>
            )}
          </div>
          <div className="flex justify-end mb-3">
            <Link to="/" className="text-sm hover:text-secondary">
              Lupa Password?
            </Link>
          </div>
          <div className="mb-3">
            <button
              type="submit"
              className="bg-primary block w-full rounded-md text-white py-1"
            >
              Masuk
            </button>
          </div>
          <div className="mb-3">
            <Link
              to="/register"
              type="submit"
              className="bg-accent block  w-full rounded-md text-primary py-1"
            >
              Daftar
            </Link>
          </div>
          <div className="w-full mb-3">
            <p className="or">atau</p>
          </div>
          <div className="mb-3">
            <Link
              to="/"
              className="flex justify-center items-center border rounded-md h-10"
            >
              <img
                src={Google}
                alt="Google"
                className="w-[25px] h-[25px]"
                loading="lazy"
              />
              Masuk dengan Google
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
