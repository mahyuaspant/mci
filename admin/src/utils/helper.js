import { toast } from "react-toastify";

export const successNotify = (text, id) => {
  return toast.success(text, { autoClose: 2000, toastId: id });
};
export const errorNotify = (text, id) => {
  return toast.error(text, { autoClose: 2000, toastId: id });
};

export function formatTimeAgo(timestamp) {
  const seconds = Math.floor((new Date() - timestamp) / 1000);
  let interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " tahun yang lalu";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " bulan yang lalu";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " hari yang lalu";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " jam yang lalu";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " menit yang lalu";
  }
  return Math.floor(seconds) + " detik yang lalu";
}
