import axios from "axios";

interface JoinOrganizationResponse {
  // Define the response type based on your API
  message: string;
  organization: {
    id: string;
    name: string;
    orgId: string;
  };
}

const joinOrganization = async (organizationId: string): Promise<JoinOrganizationResponse> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await axios.post<JoinOrganizationResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/organization/join`,
      { organizationId },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Failed to join organization");
    }
    throw new Error("An error occurred while joining the organization");
  }
};

export default joinOrganization;
