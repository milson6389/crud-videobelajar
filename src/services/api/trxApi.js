import axios from "../../axios";

const addTrx = async (trxObj) => {
  try {
    if (localStorage.getItem("user")) {
      await axios.post("/trx", trxObj);
    }
  } catch (error) {
    console.log(error);
  }
};

const getAllTrxList = async () => {
  if (localStorage.getItem("user")) {
    const userInfo = JSON.parse(localStorage.getItem("user")).email;
    try {
      const apiResponse = await axios.get(`/trx/${userInfo}`);
      localStorage.setItem("trx", JSON.stringify(apiResponse.data.data));
      return apiResponse.data.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
};

const getAllWopList = async () => {
  try {
    const apiResponse = await axios.get("/payment");
    localStorage.setItem("wop", JSON.stringify(apiResponse.data.data));
    return apiResponse.data.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const updateTrx = async (trxObj) => {
  if (localStorage.getItem("user")) {
    try {
      await axios.put("/trx", trxObj);
    } catch (error) {
      console.log(error);
    }
  }
};

const deleteTrx = async (trxObj) => {
  if (localStorage.getItem("user")) {
    try {
      await axios.delete("/trx", trxObj);
    } catch (error) {
      console.log(error);
    }
  }
};

export default {
  addTrx,
  getAllTrxList,
  getAllWopList,
  updateTrx,
  deleteTrx,
};
