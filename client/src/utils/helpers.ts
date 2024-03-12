import { ApiSubmission } from "../interfaces";
import { getApiData } from "../services/api";

export const getGoalData = async (id: string) => {
  const apiSubmissionGoalData: ApiSubmission = {
    method: "GET",
    link: "/goals/" + id,
  };

  try {
    const response = await getApiData(apiSubmissionGoalData);
    const goal = response.body.goal;

    return goal;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
