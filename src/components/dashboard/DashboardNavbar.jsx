import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const DashboardNavbar = () => {
  const location = useLocation();
  const dashboardLinks = [
    {
      id: 1,
      path: "/profile",
      header: {
        title: "Ubah Profil",
        desc: "Ubah data diri Anda",
      },
      linkTitle: (
        <>
          <i className="fa-solid fa-user me-3"></i>
          Profil Saya
        </>
      ),
    },
    {
      id: 2,
      path: "/classes",
      header: {
        title: "Daftar Kelas",
        desc: "Akses Materi Belajar dan Mulailah Meningkatkan Pengetahuan Anda!",
      },
      linkTitle: (
        <>
          <i className="fa-solid fa-book-bookmark me-3"></i>
          Kelas Saya
        </>
      ),
    },
    {
      id: 3,
      path: "/order",
      header: {
        title: "Daftar Pesanan",
        desc: "Informasi terperinci mengenai pembelian",
      },
      linkTitle: (
        <>
          <i className="fa-solid fa-bag-shopping me-3"></i>
          Pesanan Saya
        </>
      ),
    },
  ];
  const currentPage = dashboardLinks.find(
    (link) => link.path == location.pathname
  );

  return (
    <div className="flex flex-col w-full md:w-1/3 lg:w-1/4 xl:w-1/6">
      <h1 className="font-bold text-2xl">{currentPage.header.title}</h1>
      <p>{currentPage.header.desc}</p>

      <div className="my-5 bg-white border-slate-200 rounded-md p-3">
        <ul className="text-slate-500 flex flex-col gap-3">
          {dashboardLinks.map((link) => {
            return (
              <li key={link.id}>
                <Link
                  to={link.path}
                  className={`px-2 py-1 ${
                    link.path === currentPage.path &&
                    "block font-bold text-warning border border-warning bg-yellow-100 rounded-md"
                  }`}
                >
                  {link.linkTitle}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default DashboardNavbar;
