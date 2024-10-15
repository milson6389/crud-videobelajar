import { Link, useNavigate } from "react-router-dom";
import Google from "../assets/img/google_icon.webp";

import { useRef, useState } from "react";
import useUserStore from "../store/userStore";
import PhoneInput from "../components/form/PhoneInput";

const Register = () => {
  const register = useUserStore((state) => state.register);

  const [toggleShow, setToggleShow] = useState(false);
  const [isValidName, setIsValidName] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isValidPassword2, setIsValidPassword2] = useState(true);
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);

  const [phoneData, setPhoneData] = useState();
  const [isValidPhone, setIsValidPhone] = useState(true);
  const [isFormSubmit, setIsFormSubmit] = useState(false);
  const setPhoneDataHandler = (data) => {
    setPhoneData(data);
  };

  const namaInput = useRef();
  const emailInput = useRef();
  const passwordInput = useRef();
  const password2Input = useRef();
  const navigate = useNavigate();

  const setToggleShowHandler = (e) => {
    e.preventDefault();
    setToggleShow(!toggleShow);
  };

  const loginHandler = (e) => {
    e.preventDefault();
    setIsFormSubmit(true);
    setIsValidName(true);
    setIsValidEmail(true);
    setIsValidPassword(true);
    setIsPasswordMatch(true);
    setIsValidPhone(true);

    const nameVal = namaInput.current.value.trim();
    const emailVal = emailInput.current.value.trim();
    const passVal = passwordInput.current.value.trim();
    const pass2Val = password2Input.current.value.trim();

    if (
      nameVal !== "" &&
      emailVal !== "" &&
      phoneData !== undefined &&
      phoneData !== "" &&
      passVal !== "" &&
      pass2Val == passVal
    ) {
      const tempUser = {
        nama: nameVal,
        email: emailVal,
        no_hp: phoneData,
        password: passVal,
      };
      register(tempUser);
      navigate("/");
    } else {
      if (nameVal == "") {
        setIsValidName(false);
      }
      if (emailVal == "") {
        setIsValidEmail(false);
      }
      if (phoneData == "" || phoneData == undefined) {
        setIsValidPhone(false);
      }
      if (passVal == "") {
        setIsValidPassword(false);
      }
      if (pass2Val == "") {
        setIsValidPassword2(false);
      }
      if (passVal !== pass2Val) {
        setIsPasswordMatch(false);
        if (pass2Val !== "") {
          setIsValidPassword2(true);
        }
      }
    }
  };

  return (
    <div className="flex justify-center items-center my-12 md:my-52">
      <form
        onSubmit={loginHandler}
        className="w-11/12 md:w-1/2 bg-white p-10 flex flex-col justify-center text-center"
      >
        <h1 className="text-2xl font-bold">Pendaftaran Akun</h1>
        <p className="text-sm font-light">
          Yuk, daftarin akunmu sekarang juga!
        </p>
        <div className="my-5">
          <div className="flex flex-col items-start mb-3">
            <label htmlFor="nama">
              Nama Lengkap <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="nama"
              id="nama"
              ref={namaInput}
              className="w-full border rounded-md h-10"
            />
            {!isValidName && (
              <span className="text-red-500">*Nama tidak boleh kosong</span>
            )}
          </div>
          <div className="flex flex-col items-start mb-3">
            <label htmlFor="email">
              E-Mail <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              ref={emailInput}
              className="w-full border rounded-md h-10"
            />
            {!isValidEmail && (
              <span className="text-red-500">*Email tidak boleh kosong</span>
            )}
          </div>
          <PhoneInput
            setPhoneData={setPhoneDataHandler}
            isValid={isValidPhone}
            isSubmitAction={isFormSubmit}
          />
          <div className="flex flex-col items-start mb-3 relative">
            <label htmlFor="password">
              Kata Sandi <span className="text-red-500">*</span>
            </label>
            <input
              type={toggleShow ? "text" : "password"}
              name="password"
              id="password"
              ref={passwordInput}
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
              <span className="text-red-500">
                *Kata Sandi tidak boleh kosong
              </span>
            )}
          </div>
          <div className="flex flex-col items-start mb-3 relative">
            <label htmlFor="password2">
              Konfirmasi Kata Sandi <span className="text-red-500">*</span>
            </label>
            <input
              type={toggleShow ? "text" : "password"}
              name="password2"
              id="password2"
              ref={password2Input}
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
            {!isValidPassword2 && (
              <span className="text-red-500">
                *Kata Sandi tidak boleh kosong
              </span>
            )}
            {!isPasswordMatch && (
              <span className="text-red-500">
                *Kata Sandi & Konfirmasi Kata Sandi tidak sama
              </span>
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
              Daftar
            </button>
          </div>
          <div className="mb-3">
            <Link
              to="/login"
              type="submit"
              className="bg-accent block  w-full rounded-md text-primary py-1"
            >
              Masuk
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
              Daftar dengan Google
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Register;
