import Footer from "../components/Footer";
import Navbar from "../components/NavBar";

const Layout = ({ children }) => {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow overflow-y-auto">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
