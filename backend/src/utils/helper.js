import moment from "moment";
moment.locale("id");

export const dateFormat = (date) => {
  return moment(date).format("D MMMM YYYY, HH:mm");
};

export const formatToRupiah = (number) => {
  // Menggunakan fungsi toLocaleString() untuk mengubah angka menjadi format mata uang Rupiah
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number);
};

export function convertToWhatsAppFormat(localPhoneNumber) {
  // Cek apakah nomor telepon dimulai dengan "08"
  if (localPhoneNumber.startsWith("08")) {
    // Mengganti "08" dengan "+62"
    return "+62" + localPhoneNumber.slice(1);
  } else {
    // Jika nomor tidak dimulai dengan "08", mengembalikan nomor asli
    return localPhoneNumber;
  }
}