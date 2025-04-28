"use client";

import getOrganizationOrgId from "@/apis/getOrganizationOrgId";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";
import OrganizationType from "@/types/organizationType"; // Import the OrganizationType
import { useParams } from "next/navigation"; // Import the useParams hook

const Page = () => {
    const { orgId } = useParams(); // Access the `orgId` param using useParams hook

    const [organization, setOrganization] = useState<OrganizationType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!orgId) {
            setError("Organization ID is missing.");
            setLoading(false);
            return;
        }

        const fetchOrganization = async () => {
            try {
                const orgIdString = Array.isArray(orgId) ? orgId[0] : orgId;
                const data = await getOrganizationOrgId({ orgId: orgIdString });
                console.log("data", data);
                setOrganization(data); // Update state with the fetched data
            } catch (error) {
                console.error("Error fetching organization:", error);
                setError("Failed to fetch organization");
            } finally {
                setLoading(false);
            }
        };

        fetchOrganization();
    }, [orgId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!organization) return <div>No organization data found.</div>;

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString();
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Organization: {organization.name}</h1>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">SN</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Joining Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {organization.admins?.map((admin, index) => (
                        <TableRow key={admin._id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{admin.name} (Admin)</TableCell>
                            <TableCell>{admin.email}</TableCell>
                            <TableCell>{formatDate(organization.createdAt.toString())}</TableCell>
                        </TableRow>
                    ))}
                    {organization.members?.map((member, index) => (
                        <TableRow key={member._id}>
                            <TableCell>{(organization.admins?.length || 0) + index + 1}</TableCell>
                            <TableCell>{member.name}</TableCell>
                            <TableCell>{member.email}</TableCell>
                            <TableCell>{formatDate(organization.createdAt.toString())}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default Page;
