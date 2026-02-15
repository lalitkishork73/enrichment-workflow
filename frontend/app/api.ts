import { axiosInstance } from "./instance";

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await axiosInstance.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getCompanies = async () => {
  const response = await axiosInstance.get("/companies");
  return response.data;
};
