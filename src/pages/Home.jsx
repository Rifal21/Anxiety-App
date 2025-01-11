import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import AOS
import AOS from "aos";
import "aos/dist/aos.css";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize AOS
    AOS.init({ duration: 1000 });

    if (localStorage.getItem("error")) {
      localStorage.removeItem("error");
      toast.error(
        "Data tidak ditemukan. Harap selesaikan kalkulator terlebih dahulu.",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeButton: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        }
      );
    }
  }, []);

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header Section */}
      <div className="text-start" data-aos="fade-up">
        <h1 className="md:text-4xl text-2xl font-bold text-primary">
          Kenali Kecemasan Anda, Atasi dengan Tepat
        </h1>
        <p className="text-base mt-4 text-gray-700">
          Gangguan kecemasan atau anxiety disorder adalah salah satu gangguan
          mental yang paling umum dan memengaruhi banyak orang di seluruh dunia.
        </p>
      </div>

      {/* Screening Button */}
      <div className="flex justify-center mt-6" data-aos="fade-up">
        <button
          onClick={() => navigate("/calculator")}
          className="bg-primary hover:bg-primary/80 text-white py-3 px-6 rounded-lg text-lg">
          Screening Anxiety Disorder
        </button>
      </div>

      {/* About Anxiety Disorder */}
      <div className="space-y-4" data-aos="fade-up">
        <h2 className="text-2xl font-bold text-gray-800">
          Apa itu Anxiety Disorder?
        </h2>
        <p className="text-gray-700">
          Anxiety Disorder adalah kondisi kesehatan mental yang ditandai dengan
          rasa khawatir atau ketakutan berlebihan yang sulit dikendalikan.
          Berbeda dengan kecemasan normal, kecemasan pada gangguan ini lebih
          intens, berlangsung lama, dan mengganggu aktivitas sehari-hari.
        </p>
      </div>

      {/* Jenis-jenis Anxiety Disorder (Slide) */}
      <div className="space-y-2" data-aos="fade-up">
        <h2 className="text-2xl font-bold text-gray-800">
          Jenis-jenis Anxiety Disorder
        </h2>

        <Swiper slidesPerView={1} spaceBetween={20} className="w-full">
          <SwiperSlide data-aos="flip-left">
            <div className="p-4 bg-white rounded-lg shadow">
              <h3 className="text-lg font-semibold">
                Generalized Anxiety Disorder (GAD)
              </h3>
              <p className="text-gray-700">
                Perasaan cemas yang berlarut-larut terhadap banyak hal dalam
                kehidupan, bahkan tanpa alasan yang jelas.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide data-aos="flip-left">
            <div className="p-4 bg-white rounded-lg shadow">
              <h3 className="text-lg font-semibold">Panic Disorder</h3>
              <p className="text-gray-700">
                Serangan panik mendadak dengan gejala fisik yang intens, seperti
                detak jantung cepat, sesak napas, dan rasa takut akan kematian.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide data-aos="flip-left">
            <div className="p-4 bg-white rounded-lg shadow">
              <h3 className="text-lg font-semibold">Social Anxiety Disorder</h3>
              <p className="text-gray-700">
                Ketakutan berlebihan terhadap situasi sosial atau interaksi
                dengan orang lain.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide data-aos="flip-left">
            <div className="p-4 bg-white rounded-lg shadow">
              <h3 className="text-lg font-semibold">Phobias</h3>
              <p className="text-gray-700">
                Ketakutan yang ekstrem terhadap objek atau situasi tertentu,
                seperti takut ketinggian atau hewan.
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
        {/* Add "Swipe" Indicator */}
        <div className="text-start text-gray-500 ">
          <span className="italic text-sm">
            *Geser untuk melihat lebih banyak
          </span>
        </div>
      </div>

      {/* Gejala Anxiety Disorder */}
      <div className="space-y-4" data-aos="fade-up">
        <h2 className="text-2xl font-bold text-gray-800">
          Gejala Anxiety Disorder
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-white rounded-lg shadow" data-aos="fade-right">
            <h3 className="text-lg font-semibold">Gejala Emosional</h3>
            <ul className="list-disc ml-4 mt-2 text-gray-700">
              <li>Perasaan khawatir atau takut</li>
              <li>Merasa tegang dan gelisah</li>
              <li>Kegelisahan atau mudah tersinggung</li>
              <li>Mengantisipasi hal buruk</li>
            </ul>
          </div>
          <div className="p-4 bg-white rounded-lg shadow" data-aos="fade-left">
            <h3 className="text-lg font-semibold">Gejala Fisik</h3>
            <ul className="list-disc ml-4 mt-2 text-gray-700">
              <li>Jantung berdebar kencang dan sesak napas</li>
              <li>Sakit perut dan kelelahan</li>
              <li>Berkeringat, gemetar, dan berkedut</li>
              <li>Sulit tidur atau insomnia</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Motivational Section */}
      <div
        className="p-6 bg-blue-100 rounded-lg shadow text-center"
        data-aos="fade-up">
        <h2 className="text-2xl font-bold text-red-600 uppercase">Ingat!</h2>
        <p className="text-lg text-gray-700 mt-4">
          Kesehatan mental Anda sama pentingnya dengan kesehatan fisik. Jika
          Anda merasa cemas berlebihan atau mengalami gangguan tidur, jangan
          ragu untuk mencari bantuan. Kami di sini untuk mendukung Anda.
        </p>
        <button
          onClick={() => navigate("/calculator")}
          className="mt-4 bg-primary hover:bg-primary/80 text-white py-3 px-6 rounded-lg">
          Mulai Screening Sekarang!
        </button>
      </div>
    </div>
  );
}

export default Home;
