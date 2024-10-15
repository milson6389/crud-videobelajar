import { Link } from "react-router-dom";
import CardProfile from "../../assets/img/profile.png";
import KelasRating from "./KelasRating";
import KelasInfo from "./KelasInfo";

const KelasListItem = ({ kelas }) => {
  return (
    <Link
      to={`/classes/${kelas.id}`}
      className="border bg-white rounded-md p-3 flex flex-col gap-2 hover:scale-105"
    >
      <div className="flex md:flex-col justify-between items-start gap-2">
        <img
          src={kelas.thumbnail}
          alt={kelas.title}
          className="w-[150px] h-[125px] object-cover md:h-[200px] md:w-full"
          loading="lazy"
        />
        <KelasInfo kelas={kelas} />
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <KelasRating rating={kelas.rating} />
          <p className="underline">{kelas.rating} (86)</p>
        </div>
        <span className="text-primary font-bold">Rp {kelas.price}K</span>
      </div>
    </Link>
  );
};

export default KelasListItem;
