import Footer from "../components/layout/Footer";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import DashboardProfile from "../components/dashboard/DashboardProfile";

const Profile = () => {
  return (
    <>
      <main className="m-5 p-5">
        <div className="flex flex-col md:flex-row w-full gap-5 md:gap-20">
          <DashboardNavbar />
          <DashboardProfile />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Profile;
