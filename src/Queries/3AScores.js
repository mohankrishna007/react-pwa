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

export const getAffordability = (data) => {
  var req = {
    colleges : data
  }
  return axios.post(
    "https://collegeportfoliobackendnode.azurewebsites.net/college/affordability", req
  );
};

export const getAdmissibilityLogs = (data) => {
  var req = {
    colleges : data
  }
  return axios.post(
    "https://collegeportfoliobackendnode.azurewebsites.net/college/admissibilitylogs", req
  );
};

export const getAffinityLogs = (data) => {
  var req = {
    colleges : data
  }

  return axios.post(
    "https://collegeportfoliobackendnode.azurewebsites.net/college/affinitylogs", req
  );
};
