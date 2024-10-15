import { useLocation, useNavigate, useParams } from "react-router-dom";
import KelasDetailPackage from "../components/kelas/KelasDetailPackage";
import KelasPaymentProgress from "../components/kelas/KelasPaymentProgress";
import Card from "../components/ui/Card";
import KelasWOPAccordion from "../components/kelas/KelasWOPAccordion";
import useCourseStore from "../store/courseStore";
import useTrxStore from "../store/trxStore";
import useUserStore from "../store/userStore";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const allKelasData = useCourseStore((state) => state.classes);
  const classPackage = useCourseStore((state) => state.classPackage);
  const wopData = useTrxStore((state) => state.wop);
  const selectedWOP = useTrxStore((state) => state.selectedWOP);
  const adminFee = selectedWOP.admin;
  const getAllTrx = useTrxStore((state) => state.getAllTrx);
  const addTrx = useTrxStore((state) => state.addTrx);
  const updateTrx = useTrxStore((state) => state.updateTrx);
  const userInfo = useUserStore((state) => state.user);

  const kelasData = allKelasData.find((dt) => dt.id == id);

  const currencyFormatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  const coursePrice = kelasData.price * 1000;

  const checkoutHandler = async () => {
    if (location.state?.trx) {
      const existingData = location.state.trx;
      const updatedData = {
        ...existingData,
        trxType: selectedWOP.trxType,
        wopCode: selectedWOP.code,
        admin: adminFee,
        vaNo: `${selectedWOP.va_code} ${userInfo.no_hp.replace(
          userInfo.no_hp.slice(0, 3),
          "0"
        )}`,
      };
      await updateTrx(updatedData);
      await getAllTrx();
      setTimeout(() => {
        navigate(`/payment/${existingData.id}`);
      }, 500);
    } else {
      const generatedId = +new Date();
      const newTrx = {
        id: generatedId,
        kelasId: id,
        title: kelasData.title,
        email: userInfo.email,
        trxType: selectedWOP.trxType,
        wopCode: selectedWOP.code,
        price: kelasData.price * 1000,
        admin: adminFee,
        vaNo: `${selectedWOP.va_code} ${userInfo.no_hp.replace(
          userInfo.no_hp.slice(0, 3),
          "0"
        )}`,
      };
      await addTrx(newTrx);
      await getAllTrx();
      setTimeout(() => {
        navigate(`/payment/${generatedId}`);
      }, 500);
    }
  };

  return (
    <section>
      <KelasPaymentProgress />
      <main className="m-5 p-5">
        <div className="flex flex-col-reverse md:flex-row justify-between items-start gap-5 md:gap-10 w-full">
          <div className="w-full md:w-3/5">
            <Card className="mb-5">
              <h1 className="font-bold text-xl mb-3">Metode Pembayaran</h1>
              {wopData.map((data) => {
                return <KelasWOPAccordion key={data.id} data={data} />;
              })}
            </Card>
            <Card className="mb-5">
              <h1 className="font-bold text-xl mb-3">Ringkasan Pesanan</h1>
              <div className="flex justify-between items-start text-slate-500 mb-3 text-sm md:text-base">
                <p>Video Learning: {kelasData.title}</p>
                <p>{currencyFormatter.format(coursePrice)}</p>
              </div>
              <div className="flex justify-between items-start text-slate-500 mb-3 text-sm md:text-base">
                <p>Biaya Admin</p>
                <p>{currencyFormatter.format(adminFee)}</p>
              </div>
              <hr />
              <div className="flex justify-between items-start my-3 font-bold">
                <p>Total Pembayaran</p>
                <p className="text-primary ">
                  {currencyFormatter.format(coursePrice + adminFee)}
                </p>
              </div>
              <button
                onClick={checkoutHandler}
                className="w-full bg-primary text-white rounded-md py-1"
              >
                Beli Sekarang
              </button>
            </Card>
          </div>
          <Card className="w-full md:w-2/5">
            <KelasDetailPackage
              data={kelasData}
              packages={classPackage}
              isReadOnly={true}
            />
          </Card>
        </div>
      </main>
    </section>
  );
};

export default Checkout;
