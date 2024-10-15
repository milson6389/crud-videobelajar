import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/img/logo.png";
import Profile from "../../assets/img/profile.png";
import useUserStore from "../../store/userStore";

const NavBar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const logout = useUserStore((state) => state.logout);
  const navMenu = useRef(null);

  const clickedOutsideHandler = (e) => {
    if (isActive && !navMenu.current?.contains(e.target)) {
      setIsActive(false);
    }
  };

  const setIsMobileHandler = () => {
    setIsMobile(!isMobile);
  };
  const setIsActiveHandler = () => {
    setIsActive(!isActive);
  };

  const onPageChangeHandler = () => {
    setIsActive(false);
  };

  const logoutHandler = () => {
    if (confirm("Logout ?")) {
      logout();
      setIsMobile(false);
      onPageChangeHandler();
      navigate("/login");
    }
  };

  document.addEventListener("mousedown", clickedOutsideHandler);

  return (
    <header className="sticky top-0 px-5 py-2 bg-white h-fit">
      <nav className="md:hidden">
        <div className="z-10 mx-5">
          <div className="flex justify-between items-center">
            <Link to="/">
              <img
                className="w-1/3 z-10"
                src={Logo}
                alt="Logo"
                loading="lazy"
              />
            </Link>
            {isLoggedIn ? (
              <button
                onClick={setIsMobileHandler}
                id="btnToggle"
                className="cursor-pointer z-10"
              >
                {isMobile ? (
                  <i className="fa-solid fa-x"></i>
                ) : (
                  <i className="fa-solid fa-bars"></i>
                )}
              </button>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </div>
        </div>
        {isLoggedIn && (
          <ul
            className={`w-screen z-10 absolute top-0 start-0 toggleMenu flex flex-col justify-center gap-5 px-10 py-3 rounded-md border border-gray-100 bg-white shadow-lg  ${
              isMobile ? "translate-y-11" : "-translate-y-96"
            }`}
          >
            <li>
              <Link to="/">Kategori</Link>
            </li>
            <li>
              <Link to="/profile">Profil Saya</Link>
            </li>
            <li>
              <Link to="/classes">Kelas Saya</Link>
            </li>
            <li>
              <Link to="/order">Pesanan Saya</Link>
            </li>
            <li>
              <button onClick={logoutHandler} className="text-red-500">
                Keluar
                <i className="mx-1 fa-solid fa-arrow-right-from-bracket"></i>
              </button>
            </li>
          </ul>
        )}
      </nav>
      <nav className="mx-5 hidden md:flex justify-between items-center">
        <Link to="/">
          <img className="w-1/3 z-10" src={Logo} alt="Logo" loading="lazy" />
        </Link>
        {isLoggedIn ? (
          <div className="flex items-center gap-5">
            <Link to="/">Kategori</Link>
            <div className="relative" ref={navMenu}>
              <button onClick={setIsActiveHandler}>
                <img
                  src={Profile}
                  alt="profile"
                  className="w-[50px] h-[50px] rounded-md relative"
                  loading="lazy"
                />
              </button>
              <ul
                className={`toggleMenu absolute z-10 end-0 mt-2 w-56 rounded-md border border-gray-100 bg-white shadow-lg ${
                  isActive ? "" : "hidden"
                }`}
              >
                <li className="p-4 hover:bg-slate-300">
                  <Link onClick={onPageChangeHandler} to="/profile">
                    Profil Saya
                  </Link>
                </li>
                <li className="p-4 hover:bg-slate-300">
                  <Link onClick={onPageChangeHandler} to="/classes">
                    Kelas Saya
                  </Link>
                </li>
                <li className="p-4 hover:bg-slate-300">
                  <Link onClick={onPageChangeHandler} to="/order">
                    Pesanan Saya
                  </Link>
                </li>
                <li className="p-4 hover:bg-slate-300">
                  <button onClick={logoutHandler} className="text-red-500">
                    Keluar
                    <i className="mx-1 fa-solid fa-arrow-right-from-bracket"></i>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </header>
  );
};

export default NavBar;
