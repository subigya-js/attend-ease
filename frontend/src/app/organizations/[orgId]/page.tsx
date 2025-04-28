"use client";

import getOrganizationOrgId from "@/apis/getOrganizationOrgId";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";
import OrganizationType from "@/types/organizationType";
import { useParams } from "next/navigation";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import Spinner from "@/components/common/Spinner";

const Page = () => {
    const { orgId } = useParams();

    const [organization, setOrganization] = useState<OrganizationType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

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

    if (loading) return <div className="h-[90vh] flex justify-center items-center"><Spinner /></div>;
    if (error) return <div>{error}</div>;
    if (!organization) return <div>No organization data found.</div>;

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString();
    };

    const allMembers = [...(organization.admins || []), ...(organization.members || [])];
    const totalPages = Math.ceil(allMembers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentMembers = allMembers.slice(startIndex, endIndex);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Organization: {organization.name}</h1>
            <Table className="border border-gray-300 rounded-lg border-separate">
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">SN</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Joining Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {currentMembers.map((member, index) => (
                        <TableRow
                            key={member._id}
                            className={organization.admins?.some(admin => admin._id === member._id)
                                ? "bg-green-300/30 hover:bg-green-400/30"
                                : "bg-gray-300/30 hover:bg-gray-200/30"
                            }
                        >
                            <TableCell>{startIndex + index + 1}</TableCell>
                            <TableCell>{member.name} {organization.admins?.some(admin => admin._id === member._id) ? '(Admin)' : ''}</TableCell>
                            <TableCell>{member.email}</TableCell>
                            <TableCell>{formatDate(organization.createdAt.toString())}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Pagination className="mt-4">
                <PaginationContent>
                    {currentPage > 1 && (
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={() => handlePageChange(currentPage - 1)}
                            />
                        </PaginationItem>
                    )}
                    {[...Array(totalPages)].map((_, i) => (
                        <PaginationItem key={i}>
                            <PaginationLink
                                onClick={() => handlePageChange(i + 1)}
                                isActive={currentPage === i + 1}
                            >
                                {i + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    {currentPage < totalPages && (
                        <PaginationItem>
                            <PaginationNext
                                onClick={() => handlePageChange(currentPage + 1)}
                            />
                        </PaginationItem>
                    )}
                </PaginationContent>
            </Pagination>
        </div>
    );
};

export default Page;
