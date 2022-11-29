import axios from "axios";

export const getPAValues = () => {
  return axios.get(
    "https://collegeportfoliobackendnode.azurewebsites.net/admin/pavalues"
  );
};