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

    if (response.ok) {
      const result = await response.json();
      console.log("RESULT:", result);

      return result;
    } else {
      const error = await response.json();
      console.log("Failed:", error.message);

      return error;
    }
  } catch (error) {
    console.log(error);
  }
};

export const submitToApi = async (data: ApiSubmission) => {
  const token = localStorage.getItem("token");

  try {
    if (token) {
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
    }

    return;
  } catch (error) {
    console.log(error);
  }
};

export const submitBodyToApi = async (data: ApiSubmission) => {
  const token = localStorage.getItem("token");

  try {
    if (token) {
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
    }

    return;
  } catch (error) {
    console.log(data);
    console.log(error);
  }
};
