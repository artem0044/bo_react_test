import axios from "@helpers/axios/public.axios";

export const sendLogin = async (email, password) => {
  try {
    const response = await axios.post("/login", {
      email,
      password,
    });

    const data = response.data.data;

    console.log("resp", response.data.data);

    return data;
  } catch (error) {
    console.log(error.response.data.message);
    throw error;
  }
};
