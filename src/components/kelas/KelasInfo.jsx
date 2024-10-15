import CardProfile from "../../assets/img/profile.png";

const KelasInfo = ({ kelas }) => {
  return (
    <div className="flex flex-col gap-3">
      <h1 className="font-bold md:text-2xl">{kelas.title}</h1>
      <p className="hidden md:block">{kelas.desc}</p>
      <div className="flex items-center justify-start gap-3">
        <img
          src={CardProfile}
          alt={kelas.lecturerName}
          className="w-[50px] h-[50px] border rounded-md bg-cream"
          loading="lazy"
        />
        <div className="flex flex-col">
          <p className="font-bold text-sm">{kelas.lecturerName}</p>
          <p className="text-sm">{kelas.lecturerTitle}</p>
        </div>
      </div>
    </div>
  );
};

export default KelasInfo;
