import { useNavigate } from "react-router-dom";

const KelasDetailPackage = ({ data, packages, isReadOnly = false }) => {
  const navigate = useNavigate();
  const onClickBuyHandler = () => {
    navigate(`/checkout/${data.id}`);
  };

  return (
    <>
      <h1 className="text-2xl font-bold">{data.title}</h1>
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <p className="text-primary">Rp {data.price}K</p>
          <p className="text-slate-400 line-through">Rp {data.price * 2}K</p>
        </div>
        <span className="bg-warning text-white rounded-md px-2 ">
          Diskon 50%
        </span>
      </div>

      {!isReadOnly && (
        <>
          <p className="text-sky-500 text-sm">
            Penawaran spesial tersisa 2 hari lagi!
          </p>
          <button
            onClick={onClickBuyHandler}
            className="w-full bg-primary text-white rounded-md my-3"
          >
            Beli Sekarang
          </button>
        </>
      )}

      <h2 className="text-lg font-bold">Kelas ini Sudah Termasuk</h2>
      <div className="grid grid-cols-2 gap-5 my-3">
        {packages.map((cls) => {
          return (
            <span
              key={cls.id}
              className="text-slate-500 flex items-center gap-2 text-sm"
            >
              {cls.content}
            </span>
          );
        })}
      </div>
      <h2 className="text-lg font-bold">Bahasa Pengatar</h2>
      <span className="text-slate-500 flex items-center gap-2 my-2">
        <i className="fa-solid fa-globe"></i>
        Bahasa Indonesia
      </span>
    </>
  );
};

export default KelasDetailPackage;
