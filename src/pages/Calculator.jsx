import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const questions = [
  "Saya merasa lebih gugup dan cemas dari biasanya",
  "Saya merasa takut tanpa alasan sama sekali",
  "Saya mudah marah atau merasa panik",
  "Saya merasa seperti jatuh terpisah dan akan hancur berkeping-keping",
  "Saya merasa bahwa semuanya baik-baik saja dan tidak ada hal buruk akan terjadi",
  "Lengan dan kaki saya bergetar",
  "Saya terganggu oleh nyeri kepala, leher, dan nyeri punggung",
  "Saya merasa lemah dan mudah lelah",
  "Saya merasa tenang dan dapat duduk diam dengan mudah",
  "Saya merasakan jantung saya berdebar-debar",
  "Saya merasa pusing tujuh keliling",
  "Saya telah pingsan atau merasa seperti itu",
  "Saya dapat bernapas dengan mudah",
  "Saya merasa jari-jari tangan dan kaki mati rasa dan kesemutan",
  "Saya terganggu oleh nyeri lambung dan gangguan pencernaan",
  "Saya sering buang air kecil",
  "Tangan saya biasanya kering dan hangat",
  "Wajah saya merasa panas dan merah merona",
  "Saya mudah tertidur dan dapat istirahat malam dengan baik",
  "Saya mimpi buruk",
];

function Calculator() {
  const [biodata, setBiodata] = useState({ name: "", age: "", gender: "" });
  const [responses, setResponses] = useState(Array(questions.length).fill(0));
  const [step, setStep] = useState(1);
  const [visibleQuestions, setVisibleQuestions] = useState(6); // Tampilkan 6 pertanyaan awal
  const navigate = useNavigate();

  const handleResponse = (index, value) => {
    const updatedResponses = [...responses];
    updatedResponses[index] = value;
    setResponses(updatedResponses);
  };

  const calculateScore = () => {
    const totalScore = responses.reduce((acc, curr) => acc + curr, 0);

    if (responses.includes(0)) {
      alert("Harap isi semua pertanyaan sebelum melanjutkan!");
      return;
    }

    navigate("/result", { state: { score: totalScore, biodata } });
  };

  const isBiodataComplete = biodata.name && biodata.age && biodata.gender;

  // Tambahkan lebih banyak pertanyaan saat scroll ke bawah
  const handleScroll = () => {
    const bottom =
      Math.ceil(window.innerHeight + document.documentElement.scrollTop) ===
      document.documentElement.offsetHeight;
    if (bottom && visibleQuestions < questions.length) {
      setVisibleQuestions(visibleQuestions + 6); // Tambah 6 pertanyaan setiap kali scroll sampai selesai
    }
  };

  useEffect(() => {
    AOS.init(); // Inisialisasi AOS
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visibleQuestions]);

  // Cek apakah semua pertanyaan sudah terisi
  const isAllQuestionsAnswered = responses.every((response) => response !== 0);

  return (
    <div className="container mx-auto p-6 min-h-screen">
      {step === 1 && (
        <div
          data-aos="fade-up"
          data-aos-duration="1000"
          className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
          <h1 className="text-2xl font-bold text-center mb-4">Biodata User</h1>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700">Nama Lengkap</label>
              <input
                type="text"
                className="mt-2 w-full p-2 border rounded-lg"
                placeholder="Masukkan nama lengkap"
                value={biodata.name}
                onChange={(e) =>
                  setBiodata({ ...biodata, name: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Usia</label>
              <input
                type="number"
                className="mt-2 w-full p-2 border rounded-lg"
                placeholder="Masukkan usia"
                value={biodata.age}
                onChange={(e) =>
                  setBiodata({ ...biodata, age: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Jenis Kelamin</label>
              <select
                className="mt-2 w-full p-2 border rounded-lg"
                value={biodata.gender}
                onChange={(e) =>
                  setBiodata({ ...biodata, gender: e.target.value })
                }>
                <option value="">Pilih jenis kelamin</option>
                <option value="Pria">Pria</option>
                <option value="Wanita">Wanita</option>
              </select>
            </div>
            <button
              type="button"
              disabled={!isBiodataComplete}
              className={`w-full py-2 px-4 rounded-lg text-white ${
                isBiodataComplete
                  ? "bg-primary hover:bg-primary/80"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              onClick={() => setStep(2)}>
              Lanjutkan ke Kalkulator
            </button>
          </form>
        </div>
      )}
      {step === 2 && (
        <div>
          <h1
            data-aos="fade-up"
            data-aos-duration="1000"
            className="text-2xl font-bold text-center mb-6">
            Self Rating Anxiety Scale (SRAS)
          </h1>
          <p
            data-aos="fade-up"
            data-aos-duration="1200"
            className="text-gray-700 mb-6 text-center">
            Jawab setiap pertanyaan dengan memilih salah satu opsi di bawah ini.
          </p>
          {questions.slice(0, visibleQuestions).map((question, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-duration="1500"
              className="mb-6 bg-white p-4 rounded-lg shadow-lg">
              <p className="font-medium">
                {index + 1}. {question}
              </p>
              <div className="flex flex-wrap gap-4 mt-2">
                {[
                  "Tidak Pernah",
                  "Kadang-kadang",
                  "Sebagian Waktu",
                  "Hampir Setiap Waktu",
                ].map((label, i) => (
                  <label
                    key={i}
                    className="flex items-center gap-2 w-full sm:w-auto mb-2">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={i + 1}
                      onChange={() => handleResponse(index, i + 1)}
                      className="form-radio text-primary"
                    />
                    {label}
                  </label>
                ))}
              </div>
            </div>
          ))}
          {/* Tombol submit hanya muncul setelah semua pertanyaan dijawab */}
          {isAllQuestionsAnswered && (
            <button
              onClick={calculateScore}
              className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/80 mt-6">
              Submit
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Calculator;
