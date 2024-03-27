import { jwtDecode } from "jwt-decode";

import { ApiSubmission } from "../interfaces";

const baseUrl = import.meta.env.VITE_BASE_URL;

export interface DecodedToken {
  exp: number;
}

export const isTokenExpired = (token: string): boolean => {
  try {
    const decodedToken: DecodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
      localStorage.removeItem("token");
      return true;
    }
    return false;
  } catch (error) {
    localStorage.removeItem("token");
    return true;
  }
};

export const submitToApi = async (data: ApiSubmission) => {
  const token = localStorage.getItem("token");

  try {
    if (token || data.link === "/signup") {
      const response = await fetch(baseUrl + data.link, {
        method: data.method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: data.data ? JSON.stringify(data.data) : undefined,
      });

      if (!response.ok) {
        return false;
      }

      const result = await response.json();

      return result;
    }

    throw new Error("No token found");
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
