import { Link } from "react-router-dom";
import useCourseStore from "../../store/courseStore";
import Card from "../ui/Card";

const OrderListItem = ({ data }) => {
  let status = {
    label: "Berhasil",
    style: "bg-primary",
  };

  if (data.status == "INP") {
    status.label = "Gagal";
    status.style = "bg-red-500";
  }
  if (data.status == "PENDING") {
    status.label = "Belum Bayar";
    status.style = "bg-warning";
  }

  const currencyFormatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  const courseInfo = useCourseStore((state) => state.classes).find(
    (cls) => cls.id == data.kelasId
  );

  return (
    <Card className="flex flex-col gap-1 my-2 px-0 bg-lime">
      <section className="px-2">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center me-3 text-sm md:text-base">
          <span className="text-slate-400">
            No. Invoice:
            <Link
              to={`/payment/${data.id}`}
              className="text-sky-500 font-bold mx-1 cursor-pointer"
            >
              {data.trxNo}
            </Link>
          </span>
          <span className="text-slate-400">
            Waktu Pembayaran: {data.paidDt == "" ? "-" : data.paidDt}
          </span>
          <span className={`text-white rounded-md px-2 ${status.style}`}>
            {status.label}
          </span>
        </div>
      </section>
      <section className="border border-slate-300 bg-white p-2">
        <div className="flex flex-col md:flex-row items-start">
          <div className="flex gap-3 items-center w-full md:w-3/4">
            <img
              src={courseInfo.thumbnail}
              alt={courseInfo.title}
              className="w-[50px]"
              loading="lazy"
            />
            <h1 className="font-bold">{courseInfo.title}</h1>
          </div>
          <div className="flex flex-col md:w-1/4">
            <span className="text-slate-400">Harga</span>
            <span className="font-bold">
              {currencyFormatter.format(data.price)}
            </span>
          </div>
        </div>
      </section>
      <section className="px-2">
        <div className="flex justify-between items-center">
          <span className="text-slate-400 md:w-3/4">Total Pembayaran</span>
          <span className="text-primary font-bold  md:w-1/4">
            {currencyFormatter.format(data.price + data.admin)}
          </span>
        </div>
      </section>
    </Card>
  );
};

export default OrderListItem;
