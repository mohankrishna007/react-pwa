import axios from "axios";

export const fetchHighSchools = () => {
  return axios.get(
    "https://collegeportfoliobackendnode.azurewebsites.net/student/highschools"
  );
};

export const fetchColleges = () => {
  return axios.get(
    "https://collegeportfoliobackendnode.azurewebsites.net/student/colleges"
  );
};

export const fetchStreams = () => {
  return axios.get(
    "https://collegeportfoliobackendnode.azurewebsites.net/student/streams"
  );
};
