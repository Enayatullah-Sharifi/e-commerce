import android from "../assets/Brands/android.svg";
import jaguar from "../assets/Brands/jaguar.svg";
import spacex from "../assets/Brands/spacex.svg";
import cocaCola from "../assets/Brands/coca-cola.svg";
import spotify from "../assets/Brands/spotify.svg";
import mercedes from "../assets/Brands/mercedes.svg";
import airbnb from "../assets/Brands/airbnb.svg";
import ibm from "../assets/Brands/ibm.svg";
import xbox from "../assets/Brands/xbox.svg";
import nokia from "../assets/Brands/nokia.svg";

const Brands = () => {
  return (
    <>
      <div className="my-28">
        <h1 className="text-center  capitalize md:uppercase font-bold text-2xl text-slate-700 dark:text-white/50">
          Brands
        </h1>

        {/* Brands */}
        <div className="brand-wrapper relative">
          <div className="brand brand1 flex items-center justify-center overflow-h">
            <img
              src={android}
              alt=""
              className="fill-none bg-transparent mix-blend-color "
            />
          </div>

          <div className="brand brand2 flex items-center justify-center overflow-hidden">
            <img src={jaguar} alt="" />
          </div>

          <div className="brand brand3 flex items-center justify-center overflow-hidden">
            <img src={mercedes} alt="" className="h-25" />
          </div>

          <div className="brand brand4 flex items-center justify-center overflow-hidden">
            <img src={spacex} />
          </div>

          <div className="brand brand5 flex items-center justify-center overflow-hidden">
            <img src={cocaCola} />
          </div>

          <div className="brand brand6 flex items-center justify-center overflow-hidden">
            <img src={spotify} />
          </div>

          <div className="brand brand7 flex items-center justify-center overflow-hidden">
            <img src={airbnb} className="max-h-25" />
          </div>

          <div className="brand brand8 flex items-center justify-center overflow-hidden">
            <img src={ibm} alt="" />
          </div>

          <div className="brand brand9 flex items-center justify-center overflow-hidden">
            <img src={xbox} alt="" />
          </div>

          <div className="brand brand10 flex items-center justify-center overflow-hidden">
            <img src={nokia} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Brands;
