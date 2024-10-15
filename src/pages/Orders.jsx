import Footer from "../components/layout/Footer";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import DashboardFilter from "../components/dashboard/DashboardFilter";
import { useState } from "react";
import Card from "../components/ui/Card";
import OrderList from "../components/order/OrderList";
import useCourseStore from "../store/courseStore";
import useTrxStore from "../store/trxStore";

const Orders = () => {
  const filterTrx = useTrxStore((state) => state.filterTrxByTitle);
  const filterCtg = useTrxStore((state) => state.filterTrxByCategory);
  const resetFilter = useTrxStore((state) => state.resetFilter);
  const [category, setCategory] = useState("");
  const [query, setQuery] = useState("");
  const navLinks = [
    {
      id: 1,
      title: "Semua Pesanan",
      code: "",
    },
    {
      id: 2,
      title: "Menunggu",
      code: "PENDING",
    },
    {
      id: 3,
      title: "Berhasil",
      code: "DONE",
    },
    {
      id: 4,
      title: "Gagal",
      code: "INP",
    },
  ];

  const setQueryHandler = (keyword) => {
    setQuery(keyword);
    resetFilter();
    filterTrx(keyword);
  };

  const setDataByCategory = (ctg) => {
    setCategory(ctg);
    resetFilter();
    filterCtg(ctg);
  };

  return (
    <>
      <main className="m-5 p-5">
        <div className="flex flex-col md:flex-row w-full gap-5 md:gap-20">
          <DashboardNavbar />
          <Card className="w-full">
            <DashboardFilter
              navData={navLinks}
              queries={setQueryHandler}
              categories={setDataByCategory}
            />
            <OrderList />
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Orders;
