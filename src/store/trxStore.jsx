import { create } from "zustand";
import trxApi from "../services/api/trxApi";

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
    trxType: "",
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

  getAllWop: async () => {
    const wopData = await trxApi.getAllWopList();
    set(() => ({
      wop: wopData,
    }));
  },

  getWopGuide: async (type) => {
    if (localStorage.getItem("user")) {
      try {
        const wopGuide = get().wop.find((w) => w.trxType == type).guide;
        localStorage.setItem("wopGuide", JSON.stringify(wopGuide));
        set(() => ({
          paymentStepGuide: wopGuide,
        }));
      } catch (error) {
        console.log(error);
      }
    }
  },

  getAllTrx: async () => {
    const trxData = await trxApi.getAllTrxList();
    set(() => ({
      trxHistory: trxData,
    }));
  },

  addTrx: async (trxObj) => {
    if (localStorage.getItem("user")) {
      const userInfo = JSON.parse(localStorage.getItem("user")).email;
      const newTrxData = {
        id: trxObj.id,
        email: userInfo,
        kelasId: trxObj.kelasId,
        title: trxObj.title,
        trxType: trxObj.trxType,
        wopCode: trxObj.wopCode,
        price: trxObj.price,
        admin: trxObj.admin,
        vaNo: trxObj.vaNo,
      };
      await trxApi.addTrx(newTrxData);
    }
  },

  updateTrx: async (trxObj) => {
    await trxApi.updateTrx(trxObj);
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

  filterTrxByTitle: (title) => {
    const filteredTrx = get().trxHistory;
    if (title !== "") {
      const temp = filteredTrx.filter((x) =>
        x.kelasTitle.toLowerCase().includes(title.toLowerCase())
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
