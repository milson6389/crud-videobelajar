import Kelas from "../components/kelas/Kelas";
import KelasCta from "../components/kelas/KelasCta";
import KelasHero from "../components/kelas/KelasHero";
import Footer from "../components/layout/Footer";

const Home = () => {
  return (
    <>
      <main className="m-5 p-5">
        <KelasHero />
        <Kelas />
        <KelasCta />
      </main>
      <Footer />
    </>
  );
};

export default Home;
