import axios from "axios";

export const getPAValues = () => {
  return axios.get(
    "http://localhost:5000/admin/pavalues"
  );
};