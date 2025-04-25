import axios from "axios";
import OrganizationType from "@/types/organizationType";

const getOrganizations = async (): Promise<OrganizationType[]> => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get<OrganizationType[]>(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/organization/organizations`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Organizations data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching organizations:", error);
    return [];
  }
};

export default getOrganizations;
