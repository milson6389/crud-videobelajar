import { Link } from "react-router-dom";
import Logo from "../../assets/img/logo.png";
import FooterLinks from "../footer/FooterLinks";

const Footer = () => {
  const footerLinkData = [
    {
      uid: 1,
      header: "Kategori",
      child: [
        {
          title: "Digital & Teknologi",
          target: "/",
        },
        {
          title: "Pemasaran",
          target: "/",
        },
        {
          title: "Manajemen Bisnis",
          target: "/",
        },
        {
          title: "Pengembangan Diri",
          target: "/",
        },
        {
          title: "Desain",
          target: "/",
        },
      ],
    },
    {
      uid: 2,
      header: "Perusahaan",
      child: [
        {
          title: "Tentang Kami",
          target: "/",
        },
        {
          title: "FAQ",
          target: "/",
        },
        {
          title: "Kebijakan Privasi",
          target: "/",
        },
        {
          title: "Ketentuan Layanan",
          target: "/",
        },
        {
          title: "Bantuan",
          target: "/",
        },
      ],
    },
    {
      uid: 3,
      header: "Komunitas",
      child: [
        {
          title: "Tips Sukses",
          target: "/",
        },
        {
          title: "Blog",
          target: "/",
        },
      ],
    },
  ];

  return (
    <footer className="bg-white">
      <div className="m-5 p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between my-3">
          <div className="flex flex-col">
            <img
              src={Logo}
              alt="VideoBelajar"
              className="w-10/12 md:w-1/2"
              loading="lazy"
            />
            <h3 className="text-2xl font-bold">
              Gali Potensi Anda Melalui Pembelajaran Video di hariesok.id
            </h3>
            <p>Jl. Usman Effendi No. 50 Lowokwaru, Malang</p>
            <p>+62-877-7123-1234</p>
          </div>
          <FooterLinks data={footerLinkData} />
        </div>
        <hr />
        <div className="flex flex-col-reverse md:flex-row justify-between mt-5">
          <p>&copy;2023 Gerobak Sayur All Rights Reserved.</p>
          <div className="flex gap-5 my-1">
            <Link to="/" className="border rounded-full px-3 py-2">
              <i className="fa-brands fa-linkedin-in"></i>
            </Link>
            <Link to="/" className="border rounded-full px-3 py-2">
              <i className="fa-brands fa-facebook-f"></i>
            </Link>
            <Link to="/" className="border rounded-full px-3 py-2">
              <i className="fa-brands fa-instagram"></i>
            </Link>
            <Link to="/" className="border rounded-full px-3 py-2">
              <i className="fa-brands fa-twitter"></i>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
