import axios from "axios";

export const getAffinityScore = (data) => {
  var req = {
    colleges : data
  }

  return axios.post(
    "https://collegeportfoliobackendnode.azurewebsites.net/college/affinity", req
  );
};

export const getAdmissibilityScore = (data) => {
  var req = {
    colleges : data
  }
  return axios.post(
    "https://collegeportfoliobackendnode.azurewebsites.net/college/admissibility", req
  );
};

