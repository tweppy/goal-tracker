import { ApiSubmission } from "../interfaces";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const postUserToApi = async (data: ApiSubmission) => {

  try {
    const response = await fetch(baseUrl + data.link, {
      method: data.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data.data),
    });

    const result = await response.json();
    console.log("RESULT:", result);

    if (result.body.token) {
      const token = result.body.token;
      localStorage.setItem("token", token);
    }

    return result;
  } catch (error) {
    console.log(error);
  }
};

export const submitToApi = async (data: ApiSubmission) => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(baseUrl + data.link, {
      method: data.method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();
    console.log("RESULT:", result);

    return result;
  } catch (error) {
    console.log(error);
  }
};

export const submitBodyToApi = async (data: ApiSubmission) => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(baseUrl + data.link, {
      method: data.method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data.data),
    });

    const result = await response.json();
    console.log("RESULT:", result);

    return result;
  } catch (error) {
    console.log(data)
    console.log(error);
  }
};
