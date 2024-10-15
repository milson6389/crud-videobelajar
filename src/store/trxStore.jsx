import axios from "axios";
import { create } from "zustand";

const trxStore = (set, get) => ({
  wop: localStorage.getItem("wop")
    ? JSON.parse(localStorage.getItem("wop"))
    : [],
  paymentStepGuide: localStorage.getItem("wopGuide")
    ? JSON.parse(localStorage.getItem("wopGuide"))
    : [],
  trxHistory: localStorage.getItem("trx")
    ? JSON.parse(localStorage.getItem("trx"))
    : [],
  selectedWOP: {
    title: "",
    code: "",
    va_code: "",
    admin: 0,
    img: "",
    isMaintenance: false,
  },
  setSelectedWOP: (wopObj) => {
    set(() => ({ selectedWOP: wopObj }));
  },
  getWOPDetailByCode: (code) => {
    const wops = get().wop;
    for (let i = 0; i < wops.length; i++) {
      for (let j = 0; j < wops[i].sub.length; j++) {
        if (wops[i].sub[j].code == code) {
          set(() => ({ selectedWOP: wops[i].sub[j] }));
        }
      }
    }
  },
  resetTrx: () => {
    set(() => ({
      selectedWOP: {
        title: "",
        code: "",
        va_code: "",
        admin: 0,
        img: "",
        isMaintenance: false,
      },
    }));
  },

  filteredTrx: (arrKelasId) => {
    const filteredTrx = get().trxHistory;
    const temp = filteredTrx.filter((x) =>
      arrKelasId.includes(Number(x.kelas_id))
    );
    set(() => ({ trxHistory: temp }));
  },

  getAllWop: async () => {
    if (localStorage.getItem("user")) {
      try {
        const apiResponse = await axios.get("/payment");
        localStorage.setItem("wop", JSON.stringify(apiResponse.data.data));
        set(() => ({
          wop: apiResponse.data.data,
        }));
      } catch (error) {
        console.log(error);
      }
    }
  },

  getWopGuide: async (type) => {
    if (localStorage.getItem("user")) {
      try {
        const apiResponse = await axios.get(`/payment/${type}`);
        localStorage.setItem("wopGuide", JSON.stringify(apiResponse.data.data));
        set(() => ({
          paymentStepGuide: apiResponse.data.data,
        }));
        return apiResponse.data.data;
      } catch (error) {
        console.log(error);
      }
    }
  },

  getAllTrx: async () => {
    if (localStorage.getItem("user")) {
      const userInfo = JSON.parse(localStorage.getItem("user")).email;
      try {
        const apiResponse = await axios.get(`/trx/${userInfo}`);
        localStorage.setItem("trx", JSON.stringify(apiResponse.data.data));
        set(() => ({
          trxHistory: apiResponse.data.data,
        }));
      } catch (error) {
        console.log(error);
      }
    }
  },

  addTrx: async (trxObj) => {
    if (localStorage.getItem("user")) {
      const userInfo = JSON.parse(localStorage.getItem("user")).email;
      try {
        const newTrxData = {
          id: trxObj.id,
          email: userInfo,
          kelasId: trxObj.kelasId,
          title: trxObj.title,
          wopCode: trxObj.wopCode,
          price: trxObj.price,
          admin: trxObj.admin,
          vaNo: trxObj.vaNo,
        };
        await axios.post("/trx", newTrxData);
      } catch (error) {
        console.log(error);
      }
    }
  },

  updateTrx: async (trxObj) => {
    if (localStorage.getItem("user")) {
      try {
        await axios.put("/trx", trxObj);
      } catch (error) {
        console.log(error);
      }
    }
  },

  filterTrxByCategory: (ctg) => {
    const filteredTrx = get().trxHistory;
    if (ctg !== "") {
      const temp = filteredTrx.filter(
        (x) => x.status.toLowerCase() == ctg.toLowerCase()
      );
      set(() => ({ trxHistory: temp }));
    }
  },
  resetFilter: () => {
    set(() => ({
      trxHistory: JSON.parse(localStorage.getItem("trx")),
    }));
  },
});

const useTrxStore = create(trxStore);
export default useTrxStore;
