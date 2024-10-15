import { create } from "zustand";

const userStore = (set, get) => ({
  user: JSON.parse(localStorage.getItem("user"))
    ? JSON.parse(localStorage.getItem("user"))
    : {
        uid: "",
        nama: "",
        email: "",
        password: "",
        no_hp: "",
      },
  isLoggedIn: localStorage.getItem("user") ? true : false,
  login: (userObj) => {
    const userInfo = {
      uid: +new Date(),
      nama: "user 1", //default value karena belom ada database / table user
      email: userObj?.email,
      password: userObj?.password,
      no_hp: "+621234567890", //default value karena belom ada database / table user
    };
    set((state) => ({
      user: userInfo,
      isLoggedIn: true,
    }));
    localStorage.setItem("user", JSON.stringify(userInfo));
  },
  register: (userObj) => {
    const userInfo = {
      uid: +new Date(),
      nama: userObj?.nama,
      email: userObj?.email,
      password: userObj?.password,
      no_hp: userObj?.no_hp,
    };
    set((state) => ({
      user: userInfo,
      isLoggedIn: true,
    }));
    localStorage.setItem("user", JSON.stringify(userInfo));
  },
  update: (userObj) => {
    const userInfo = {
      nama: userObj?.nama,
      email: userObj?.email,
      password: userObj?.password,
      no_hp: userObj?.no_hp,
    };
    set((state) => ({
      user: { ...state.user, ...userInfo },
      isLoggedIn: true,
    }));
    localStorage.setItem("user", JSON.stringify(userInfo));
  },
  logout: () => {
    const userInfo = {
      uid: "",
      nama: "",
      email: "",
      password: "",
      no_hp: "",
    };
    set((state) => ({
      user: userInfo,
      isLoggedIn: false,
    }));
    localStorage.removeItem("user");
    localStorage.removeItem("trx");
    localStorage.removeItem("course");
  },
});

const useUserStore = create(userStore);
export default useUserStore;
