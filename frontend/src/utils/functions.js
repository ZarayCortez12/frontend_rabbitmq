import toast from "react-hot-toast";

export function alert_success(success, message) {
  toast.success(success + "\n" + message, {
    duration: 1500,
    position: "bottom-center",
    style: {
      padding: "10px 20px",
      background: "#f1f1f1",
      borderRadius: "8px",
      fontWeight: "bold",
    },
  });
}


export function alert_error(error, message) {
  toast.error(error + "\n" + message, {
    position: "bottom-center",
    style: {
      padding: "10px 20px",
      background: "#f1f1f1",
      borderRadius: "8px",
      fontWeight: "bold",
    },
  });
}