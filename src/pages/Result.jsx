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
        color: "bg-green-500", // Warna untuk normal
        pdfColor: [0, 255, 0], // RGB untuk hijau (untuk PDF)
      };
    } else if (score >= 45 && score <= 59) {
      return {
        level: "Kecemasan Ringan",
        message:
          "Anda mengalami kecemasan ringan. Ini mungkin terkait dengan stres sehari-hari. Tenangkan diri dan coba kendalikan pemicunya.",
        color: "bg-yellow-500", // Warna untuk kecemasan ringan
        pdfColor: [255, 255, 0], // RGB untuk kuning (untuk PDF)
      };
    } else if (score >= 60 && score <= 74) {
      return {
        level: "Kecemasan Sedang",
        message:
          "Anda mengalami kecemasan sedang. Kondisi ini dapat memengaruhi keseharian Anda. Ada baiknya untuk mulai mencari bantuan profesional.",
        color: "bg-orange-500", // Warna untuk kecemasan sedang
        pdfColor: [255, 165, 0], // RGB untuk oranye (untuk PDF)
      };
    } else if (score >= 75 && score <= 80) {
      return {
        level: "Kecemasan Berat",
        message:
          "Anda mengalami kecemasan berat. Kondisi ini dapat mengganggu kehidupan sehari-hari. Segera dapatkan bantuan profesional.",
        color: "bg-red-500", // Warna untuk kecemasan berat
        pdfColor: [255, 0, 0], // RGB untuk merah (untuk PDF)
      };
    } else {
      return {
        level: "Tidak Valid",
        message: "Skor tidak valid. Pastikan Anda menjawab semua pertanyaan.",
        color: "bg-gray-500", // Warna untuk tidak valid
        pdfColor: [169, 169, 169], // RGB untuk abu-abu (untuk PDF)
      };
    }
  };

  // Dapatkan hasil
  const result = getResultMessage(score);

  // Fungsi untuk mengunduh hasil sebagai PDF
  const downloadPDF = () => {
    const doc = new jsPDF();

    // Menambahkan logo
    doc.addImage(logo, "PNG", 10, 10, 50, 50); // Posisi X, Y dan ukuran (lebar, tinggi)

    // Menambahkan nama institusi
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("Sekolah Tinggi Ilmu Kesehatan (STIKES)", 70, 30); // Nama institusi
    doc.text("Payung Negeri PEKANBARU", 70, 40); // Nama institusi

    // Menambahkan biodata
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Nama: ${biodata.name}`, 10, 70);
    doc.text(`Usia: ${biodata.age}`, 10, 80);
    doc.text(`Jenis Kelamin: ${biodata.gender}`, 10, 90);
    doc.text(`Skor Total: ${score}`, 10, 100);

    // Menambahkan grafik hasil kecemasan (grafik batang sederhana)
    const barHeight = 10;
    const barWidth = 180;
    const x = 10;
    const y = 110;
    const scorePercentage = (score / 80) * 100; // Persentase berdasarkan skor

    // Menambahkan bar dengan warna sesuai hasil
    doc.setFillColor(...result.pdfColor); // Menggunakan warna dari result untuk PDF
    doc.rect(x, y, (scorePercentage / 100) * barWidth, barHeight, "FD");

    // Menambahkan keterangan grafik
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Tingkat Kecemasan", 10, y + 20); // Keterangan tentang grafik
    doc.text(`${scorePercentage.toFixed(2)}%`, x + barWidth + 5, y + 5); // Persentase skor pengguna

    // Menambahkan hasil kecemasan
    doc.text(`Tingkat Kecemasan: ${result.level}`, 10, 130);

    // Membagi pesan ke dalam dua baris jika panjang pesan lebih dari batas
    const messageLines = doc.splitTextToSize(result.message, 180); // Membatasi lebar teks ke 180
    doc.text(messageLines, 10, 140);

    // Menyimpan PDF
    doc.save("hasil_kecemasan.pdf");
  };

  return score && biodata ? (
    <div
      className="container mx-auto p-6"
      data-aos="fade-up"
      data-aos-anchor-placement="center-center"
      data-aos-duration="1000">
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
          <p className="text-gray-700 mt-2">{result.message}</p>
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
