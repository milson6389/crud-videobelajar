import Card from "../ui/Card";
import ProfileImg from "../../assets/img/profile.png";
import KelasRating from "./KelasRating";

const KelasParticipant = ({ data, rating = 0 }) => {
  return (
    <Card className="flex flex-col my-3 md:w-1/2">
      <div className="flex items-start gap-5">
        <img
          src={ProfileImg}
          alt={data.lecturer_name}
          className="w-[50px] rounded-md"
          loading="lazy"
        />
        <div className="flex flex-col">
          <h3 className="text-lg">{data.lecturer_name}</h3>
          <p className="text-slate-500">
            {rating > 0 ? "Alumni" : data.lecturer_title}
          </p>
        </div>
      </div>
      <p>{data.lecturer_desc}</p>
      {rating > 0 && (
        <div className="flex items-center gap-3 my-2">
          <KelasRating rating={rating} />
          <span>{rating}</span>
        </div>
      )}
    </Card>
  );
};

export default KelasParticipant;
