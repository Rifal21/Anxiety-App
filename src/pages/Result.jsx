import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import Toastify
import jsPDF from "jspdf"; // Import jsPDF
import AOS from "aos";
import "aos/dist/aos.css";

// Pastikan untuk menambahkan logo Anda di folder public dan masukkan nama file logo yang sesuai
import logo from "../image/payung negeri.png"; // Ganti dengan path ke logo Anda

function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  // Ambil data dari state
  const { score, biodata } = location.state || {};

  // Validasi: Jika data tidak ada, redirect ke halaman kalkulator
  React.useEffect(() => {
    AOS.init();
    if (!score || !biodata) {
      localStorage.setItem(
        "error",
        "Data tidak ditemukan. Harap selesaikan kalkulator terlebih dahulu."
      );
      navigate("/");
    }
  }, [score, biodata, navigate]);

  const getResultMessage = (score) => {
    if (score >= 20 && score <= 44) {
      return {
        level: "Normal/Tidak Cemas",
        message:
          "Anda dalam kondisi baik dan tidak menunjukkan tanda-tanda kecemasan. Pertahankan gaya hidup sehat Anda!",
        color: "bg-green-500",
        pdfColor: [0, 255, 0],
        solution: [
          "Lakukan aktivitas fisik seperti olahraga ringan secara rutin.",
          "Tidur yang cukup dan makan makanan yang bergizi.",
          "Gunakan teknik relaksasi sederhana, seperti pernapasan dalam atau meditasi.",
          "Hindari stres dengan mengatur waktu dan prioritas.",
        ],
      };
    } else if (score >= 45 && score <= 59) {
      return {
        level: "Kecemasan Ringan",
        message:
          "Anda mengalami kecemasan ringan. Ini mungkin terkait dengan stres sehari-hari. Tenangkan diri dan coba kendalikan pemicunya.",
        color: "bg-yellow-500",
        pdfColor: [255, 255, 0],
        solution: [
          "Lakukan teknik relaksasi seperti mindfulness atau yoga untuk menenangkan diri.",
          "Luangkan waktu untuk melakukan aktivitas menyenangkan atau hobi favorit Anda.",
          "Bicarakan perasaan Anda dengan orang yang dipercaya, seperti teman atau keluarga.",
        ],
      };
    } else if (score >= 60 && score <= 74) {
      return {
        level: "Kecemasan Sedang",
        message:
          "Anda mengalami kecemasan sedang. Kondisi ini dapat memengaruhi keseharian Anda. Ada baiknya untuk mulai mencari bantuan profesional.",
        color: "bg-orange-500",
        pdfColor: [255, 165, 0],
        solution: [
          "Konsultasi dengan psikolog untuk mendapatkan dukungan dan strategi penanganan.",
          "Batasi konsumsi kafein, alkohol, atau zat yang dapat meningkatkan kecemasan.",
          "Cobalah membuat rutinitas yang teratur untuk mengurangi perasaan tidak terkendali.",
        ],
      };
    } else if (score >= 75 && score <= 80) {
      return {
        level: "Kecemasan Berat",
        message:
          "Anda mengalami kecemasan berat. Kondisi ini dapat mengganggu kehidupan sehari-hari. Segera dapatkan bantuan profesional.",
        color: "bg-red-500",
        pdfColor: [255, 0, 0],
        solution: [
          "Segera konsultasi dengan tenaga profesional seperti psikolog atau psikiater.",
          "Pertimbangkan terapi seperti terapi kognitif-perilaku (CBT) untuk mengubah pola pikir negatif.",
          "Jika diperlukan, psikiater dapat merekomendasikan pengobatan untuk membantu mengurangi gejala.",
          "Libatkan diri dalam terapi kelompok atau komunitas untuk memperkuat dukungan sosial.",
        ],
      };
    } else {
      return {
        level: "Tidak Valid",
        message: "Skor tidak valid. Pastikan Anda menjawab semua pertanyaan.",
        color: "bg-gray-500",
        pdfColor: [169, 169, 169],
        solution: [],
      };
    }
  };

  // Dapatkan hasil
  const result = getResultMessage(score);

  // Fungsi untuk mengunduh hasil sebagai PDF
  const downloadPDF = () => {
    const doc = new jsPDF();

    // Header
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text(
      "Hasil Penilaian Tingkat Kecemasan",
      105,
      20,
      null,
      null,
      "center"
    );
    doc.setFontSize(14);
    doc.text(
      "Sekolah Tinggi Ilmu Kesehatan (STIKES) Payung Negeri",
      105,
      30,
      null,
      null,
      "center"
    );

    // Logo
    doc.addImage(logo, "PNG", 10, 10, 30, 30);

    // Biodata
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Nama: ${biodata.name}`, 20, 50);
    doc.text(`Usia: ${biodata.age}`, 20, 60);
    doc.text(`Jenis Kelamin: ${biodata.gender}`, 20, 70);
    doc.text(`Skor Total: ${score}`, 20, 80);

    // Hasil
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Hasil Penilaian", 20, 100);
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Tingkat Kecemasan: ${result.level}`, 20, 110);
    doc.text(result.message, 20, 120, { maxWidth: 170 });
    doc.setFont("helvetica", "bold");
    doc.text("Solusi", 20, 135);
    // Solusi dengan gambar
    result.solution.forEach((solution, index) => {
      const yPosition = 140 + index * 40; // Adjust spacing between solutions
      doc.addImage(
        `/image/Solusi/hasil-${index + 1}/solution-${index + 1}.jpg`,
        "JPEG",
        20,
        yPosition,
        40,
        25 // Slightly smaller image size
      );
      doc.setFont("helvetica", "normal");
      doc.text(solution, 20, yPosition + 35, { maxWidth: 170 }); // Text below the image
    });

    // Unduh file PDF
    doc.save("hasil_kecemasan.pdf");
  };

  return score && biodata ? (
    <div className="container mx-auto p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-center mb-6">Hasil Penilaian</h1>
        <div className="mb-6">
          <h2 className="text-lg font-semibold">Biodata</h2>
          <p className="text-gray-700">Nama: {biodata.name}</p>
          <p className="text-gray-700">Usia: {biodata.age}</p>
          <p className="text-gray-700">Jenis Kelamin: {biodata.gender}</p>
        </div>
        <div className="mb-6">
          <h2 className="text-lg font-semibold">Skor Anda</h2>
          <p className="text-gray-700">Skor Total: {score}</p>
          <div className="relative w-full bg-gray-200 h-6 rounded-full overflow-hidden mt-2">
            <div
              className={`h-full ${result.color}`}
              style={{ width: `${(score / 80) * 100}%` }}
            />
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-lg font-semibold">Hasil</h2>
          <p className="text-gray-700">
            Tingkat Kecemasan: <span className="font-bold">{result.level}</span>
          </p>
          <p className="text-gray-700 mt-2 mb-5">{result.message}</p>
          <h2 className="text-lg font-semibold mb-2">Solusi</h2>
          <ul className="text-gray-700 list-decimal pl-5">
            {result.solution.map((solution, index) => (
              <li
                className="mb-4 flex flex-wrap items-center justify-center"
                key={index}>
                <div className="w-full h-full bg-gray-100 rounded flex-shrink-0 mr-4">
                  <img
                    src={`/image/Solusi/hasil-${index + 1}/solution-${
                      index + 1
                    }.jpg`}
                    alt={`Gambar solusi ${index + 1}`}
                    className="w-full h-full object-cover rounded"
                    data-aos="zoom-in"
                  />
                </div>
                <p className="text-gray-700 text-start mt-3">
                  {index + 1}. {solution}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={() => navigate("/")}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
          Kembali ke Beranda
        </button>
        <button
          onClick={downloadPDF}
          className="w-full mt-4 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600">
          Unduh Hasil sebagai PDF
        </button>
      </div>
    </div>
  ) : null; // Jika data tidak ada, tidak render apapun
}

export default Result;
