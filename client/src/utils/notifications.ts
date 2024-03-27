import toast from "react-hot-toast";

export const notifySuccess = (message: string) => {
  toast.success(message, {
    duration: 2000,
    position: "bottom-center",
  });
};

export const notifyError = (message: string) => {
  toast.error(message, {
    duration: 2000,
    position: "bottom-center",
  });
};
