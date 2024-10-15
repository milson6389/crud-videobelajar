import KelasListItem from "./KelasListItem";

const KelasList = ({ data }) => {
  return (
    <div className="my-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {data.map((dt) => {
          return <KelasListItem key={dt.id} kelas={dt} />;
        })}
      </div>
    </div>
  );
};

export default KelasList;
