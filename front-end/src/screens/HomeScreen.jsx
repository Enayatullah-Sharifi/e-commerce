import Header from "../components/Header";
import Footer from "../components/Footer";
import Brands from "../components/Brands";
import Slider from "../components/Slider";
import TopProducts from "../components/TopProducts";
import AllProducts from "../components/AllProducts";
import CountDown from "../components/CountDown";

const HomeScreen = () => {
  return (
    <div className="dark:bg-slate-900 pt-20">
      {/* Header */}
      <Header />

      {/* Slider */}
      <Slider />

      {/* Count Down */}
      <CountDown />

      {/* Top Products */}
      <TopProducts />

      {/* Brands animation */}
      <Brands />

      {/* All Products */}
      <AllProducts />

      <Footer />
    </div>
  );
};

export default HomeScreen;
``;
