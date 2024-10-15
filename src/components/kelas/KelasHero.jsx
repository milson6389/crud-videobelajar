const KelasHero = () => {
  return (
    <div className="hero rounded-md flex flex-col justify-center items-center text-center my-5">
      <div className="flex flex-col items-center text-2xl text-white gap-5 md:w-3/5">
        <h1 className="font-bold text-2xl md:text-4xl">
          Revolusi Pembelajaran: Temukan Ilmu Baru melalui Platform Video
          Interaktif!
        </h1>
        <p className="text-sm">
          Temukan ilmu baru yang menarik dan mendalam melalui koleksi video
          pembelajaran berkualitas tinggi. Tidak hanya itu, Anda juga dapat
          berpartisipasi dalam latihan interaktif yang akan meningkatkan
          pemahaman Anda.
        </p>
        <button className="border rounded-md px-5 py-2 bg-primary text-sm">
          Temukan Video Course untuk Dipelajari!
        </button>
      </div>
    </div>
  );
};

export default KelasHero;
