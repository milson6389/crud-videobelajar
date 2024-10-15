import ProfileImage from "../../assets/img/profile.png";
import { useState } from "react";
import useUserStore from "../../store/userStore";
import PhoneInput from "../form/PhoneInput";
import { useNavigate } from "react-router-dom";

const DashboardProfile = () => {
  const navigate = useNavigate();
  const updateUser = useUserStore((state) => state.update);
  const loggedInUserInfo = useUserStore((state) => state.user);
  const [toggleShow, setToggleShow] = useState(false);
  const setToggleShowHandler = (e) => {
    e.preventDefault();
    setToggleShow(!toggleShow);
  };

  const [fullName, setFullName] = useState(loggedInUserInfo?.nama);
  const [email, setEmail] = useState(loggedInUserInfo?.email);
  const [phone, setPhone] = useState(loggedInUserInfo?.no_hp);
  const [password, setPassword] = useState(loggedInUserInfo?.password);
  const [password2, setPassword2] = useState(loggedInUserInfo?.password);
  const [phoneData, setPhoneData] = useState();

  const [isValidName, setIsValidName] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isValidPassword2, setIsValidPassword2] = useState(true);
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [isValidPhone, setIsValidPhone] = useState(true);
  const [isFormSubmit, setIsFormSubmit] = useState(false);

  const setFullNameHandler = (e) => {
    setFullName(e.target.value);
  };

  const setPhoneDataHandler = (data) => {
    setPhoneData(data);
  };

  const setPasswordHandler = (e) => {
    setPassword(e.target.value);
  };

  const setPassword2Handler = (e) => {
    setPassword2(e.target.value);
  };
  const updateUserHandler = (e) => {
    e.preventDefault();
    setIsFormSubmit(true);
    setIsValidName(true);
    setIsValidEmail(true);
    setIsValidPassword(true);
    setIsPasswordMatch(true);
    setIsValidPhone(true);

    if (
      fullName !== "" &&
      phoneData !== "" &&
      password !== "" &&
      password2 == password
    ) {
      const tempUser = {
        nama: fullName,
        email: email,
        no_hp: phoneData || phone,
        password: password,
      };
      if (confirm("Update User Info ?")) {
        updateUser(tempUser);
        navigate("/profile");
      }
    } else {
      if (fullName == "") {
        setIsValidName(false);
      }
      if (email == "") {
        setIsValidEmail(false);
      }
      if (phoneData == "" || phoneData == undefined) {
        setIsValidPhone(false);
      }
      if (password == "") {
        setIsValidPassword(false);
      }
      if (password2 == "") {
        setIsValidPassword2(false);
      }
      if (password !== password2) {
        setIsPasswordMatch(false);
        if (password2 !== "") {
          setIsValidPassword2(true);
        }
      }
    }
  };

  return (
    <div className="flex flex-col items-start p-3 border border-slate-300 rounded-md bg-white w-full">
      <div className="flex justify-start gap-5 md:gap-10 w-full">
        <img
          src={ProfileImage}
          alt="profile_image"
          className="w-[100px]"
          loading="lazy"
        />
        <div className="flex flex-col items-start gap-3">
          <h1 className="text-2xl">{loggedInUserInfo.nama}</h1>
          <p className="text-md">{loggedInUserInfo.email}</p>
          <button className="text-red-500">Ganti Foto Profil</button>
        </div>
      </div>

      <form
        onSubmit={updateUserHandler}
        className="flex flex-col justify-between w-full my-5"
      >
        <div className="flex flex-col mb-3">
          <label htmlFor="name" className="focus:text-primary">
            Nama Lengkap <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={fullName}
            onChange={(e) => setFullNameHandler(e)}
            className="h-10 border px-1 border-slate-300 rounded-md focus:border focus:border-primary"
          />
          {!isValidName && (
            <span className="text-red-500">*Nama tidak boleh kosong</span>
          )}
        </div>
        <div className="flex flex-col mb-3">
          <label htmlFor="email">
            E-Mail <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            disabled
            className="h-10 border px-1 border-slate-300 rounded-md focus:border focus:border-primary"
          />
          {!isValidEmail && (
            <span className="text-red-500">*Email tidak boleh kosong</span>
          )}
        </div>
        <PhoneInput
          setPhoneData={setPhoneDataHandler}
          existingVal={phone}
          isValid={isValidPhone}
          isSubmitAction={isFormSubmit}
        />
        <div className="flex flex-col items-start mb-3 relative">
          <label htmlFor="password">
            Password <span className="text-red-500">*</span>
          </label>
          <input
            type={toggleShow ? "text" : "password"}
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPasswordHandler(e)}
            className="h-10 px-1 w-full border rounded-md"
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
            <span className="text-red-500">*Kata Sandi tidak boleh kosong</span>
          )}
        </div>
        <div className="flex flex-col items-start mb-3 relative">
          <label htmlFor="password2">
            Konfirmasi Password <span className="text-red-500">*</span>
          </label>
          <input
            type={toggleShow ? "text" : "password"}
            name="password2"
            id="password2"
            value={password2}
            onChange={(e) => setPassword2Handler(e)}
            className="h-10 px-1 w-full border rounded-md"
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
            <span className="text-red-500">*Kata Sandi tidak boleh kosong</span>
          )}
          {!isPasswordMatch && (
            <span className="text-red-500">
              *Kata Sandi & Konfirmasi Kata Sandi tidak sama
            </span>
          )}
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="text-white bg-primary px-5 py-3 rounded-md w-full md:w-24"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
};

export default DashboardProfile;
