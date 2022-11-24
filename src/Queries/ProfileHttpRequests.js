import axios from "axios";

export const postStudentAbout = (req) => {
  return axios.post(
    "https://collegeportfoliobackendnode.azurewebsites.net/student/about", req
  );
};

export const postStudentAcademics = (req) => {
  return axios.post(
    "https://collegeportfoliobackendnode.azurewebsites.net/student/academics", req
  );
};

export const postStudentFinance = (req) => {
    return axios.post(
     "https://collegeportfoliobackendnode.azurewebsites.net/student/financial", req
    );
};

export const postStudentPreference = (req) => {
    return axios.post(
    "https://collegeportfoliobackendnode.azurewebsites.net/student/preference", req
    );
};

export const updateProfileCompletetion = () => {
  return axios.get("https://collegeportfoliobackendnode.azurewebsites.net/student/updateprofile")
}

export const getUserProfile = () => {
  return axios.get("https://collegeportfoliobackendnode.azurewebsites.net/student/getprofile");
}