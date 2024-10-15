import Card from "../ui/Card";
import ProfileImg from "../../assets/img/profile.png";
import KelasRating from "./KelasRating";

const KelasParticipant = ({ data, rating = 0 }) => {
  return (
    <Card className="flex flex-col my-3 w-full md:w-1/2">
      <div className="flex items-start gap-5">
        <img
          src={ProfileImg}
          alt={data.lecturerName}
          className="w-[50px] rounded-md"
          loading="lazy"
        />
        <div className="flex flex-col">
          <h3 className="text-lg">{data.lecturerName}</h3>
          <p className="text-slate-500">
            {rating > 0 ? "Alumni" : data.lecturerTitle}
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
