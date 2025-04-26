import axios from "axios";

interface CreateOrganizationResponse {
  // Define the response type based on your API
  message: string;
  organization: {
    id: string;
    name: string;
    orgId: string;
  };
}

const createOrganization = async (name: string, orgId: string): Promise<CreateOrganizationResponse> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await axios.post<CreateOrganizationResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/organization/create`,
      { name, orgId },
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
      throw new Error(error.response.data.message || "Failed to create organization");
    }
    throw new Error("An error occurred while creating the organization");
  }
};

export default createOrganization;
