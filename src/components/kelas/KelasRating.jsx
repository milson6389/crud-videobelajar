const KelasRating = ({ rating }) => {
  return (
    <div className="flex items-center gap-3 my-2">
      {Array.from(Array(5), (e, i) => {
        return (
          <i
            key={i}
            className={`fa-solid fa-star ${
              rating > i ? "text-warning" : "text-slate-500"
            } `}
          ></i>
        );
      })}
    </div>
  );
};

export default KelasRating;
