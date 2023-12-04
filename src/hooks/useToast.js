import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import toast from "react-hot-toast";
import Toast from "../components/Toast";

export const useToast = () => {
  const location = useLocation();

  useEffect(() => {
    toast.dismiss();
    // console.log("remove");
  }, []);

  return { toast, Toast };
};
