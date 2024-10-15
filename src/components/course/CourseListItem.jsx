import Card from "../ui/Card";
import KelasInfo from "../kelas/KelasInfo";

const CourseListItem = ({ data }) => {
  return (
    <Card className="flex flex-col gap-1 my-2 px-0 bg-lime">
      <section className="py-1 px-2">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center me-3 text-sm md:text-base">
          <span className="font-bold">0/12 Modul Terselesaikan</span>
          <span className={`text-white rounded-md px-2 bg-warning`}>
            Sedang Berjalan
          </span>
        </div>
      </section>
      <section className="border border-slate-300 bg-white p-2">
        <div className="flex flex-col md:flex-row gap-3 items-start">
          <img
            src={data.thumbnail}
            alt={data.title}
            className="w-full h-fit md:w-[200px]  object-cover rounded-md"
            loading="lazy"
          />
          <div className="flex flex-col">
            <KelasInfo kelas={data} />
            <div className="flex gap-3 items-center my-1 text-slate-500">
              <span>
                <i className="fa-regular fa-newspaper mx-1"></i>
                12 Modul
              </span>
              <span>
                <i className="fa-regular fa-clock mx-1"></i>
                360 Menit
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="px-2 py-1">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center w-full md:w-3/4 mb-1">
            <span className="text-slate-400 ">Progress Kelas:</span>
            <span className="flex items-center gap-2 text-black font-bold mx-1">
              0%
            </span>
            <div className="bg-red-200 rounded-3xl h-2.5 w-1/3">
              <div className="bg-red-500 h-2.5 rounded-3xl w-1"></div>
            </div>
          </div>
          <button className="bg-primary text-white rounded-md py-1 font-bold w-full  md:w-1/4">
            Lanjutkan Pembelajaran
          </button>
        </div>
      </section>
    </Card>
  );
};

export default CourseListItem;
