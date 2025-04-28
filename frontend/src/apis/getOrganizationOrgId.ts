import axios from "axios";
import OrganizationType from "@/types/organizationType";

const getOrganizationOrgId = async ({ orgId }: { orgId: string }): Promise<OrganizationType> => {
    try {
        const token = localStorage.getItem("token");

        const response = await axios.get<OrganizationType>(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/organization/${orgId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (response.status !== 200) {
            throw new Error("Failed to fetch organization");
        }
        const data = response.data;
        console.log("OrgID", data);
        return {
            ...data,
            admins: data.admins ?? [],
            members: data.members ?? [],
        };
    } catch (error) {
        console.error("Error fetching organization:", error);
        throw error;
    }
};

export default getOrganizationOrgId;
