const KelasDetailHeader = ({ data }) => {
  const headerStyleClass = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${data.thumbnail})`,
    objectFit: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };
  return (
    <>
      <p>
        Beranda / {data.category} /{" "}
        <span className="font-bold">{data.title}</span>
      </p>
      <div
        className="rounded-md flex flex-col justify-center items-start p-5 md:p-10 my-5 h-fit min-h-[400px]"
        style={headerStyleClass}
      >
        <div className="flex flex-col items-start text-2xl text-white gap-3">
          <h1 className="font-bold text-2xl md:text-4xl">{data.title}</h1>
          <h1 className="text-2xl text-slate-200">
            Belajar bersama tutor profesional di Video Course. Kapanpun,
            dimanapun
          </h1>
          <div className="flex items-center gap-5">
            {Array.from(Array(5), (e, i) => {
              return (
                <i
                  key={i}
                  className={`fa-solid fa-star ${
                    data.rating > i ? "text-warning" : "text-slate-500"
                  } `}
                ></i>
              );
            })}
            <u className="text-slate-200">{data.rating} (86)</u>
          </div>
        </div>
      </div>
    </>
  );
};

export default KelasDetailHeader;
