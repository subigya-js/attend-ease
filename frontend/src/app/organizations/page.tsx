'use client'

import getOrganizations from '@/apis/getOrganizations'
import EmptyScreen from '@/components/common/EmptyScreen'
import Spinner from '@/components/common/Spinner'
import OrganizationCard from '@/components/organizations/OrganizationCard'
import OrgIdModal from '@/components/modals/OrgIdModal'
import OrganizationType from '@/types/organizationType'
import { useEffect, useState } from 'react'

const OrganizationsPage = () => {
    const [organizations, setOrganizations] = useState<OrganizationType[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        const fetchOrganizations = async () => {
            try {
                const fetchedOrganizations = await getOrganizations()
                setOrganizations(fetchedOrganizations)
            } catch (error) {
                console.error('Error fetching organizations:', error)
                setError('Failed to fetch organizations. Please try again later.')
            } finally {
                setIsLoading(false)
            }
        }
        fetchOrganizations()
    }, [])

    const handleOpenModal = () => {
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
    }

    const handleSubmitOrgId = async (orgId: string) => {
        console.log('Organization ID submitted:', orgId)
        // Here you would typically make an API call to join the organization
        // For now, we'll just close the modal and refetch organizations
        handleCloseModal()
        setIsLoading(true)
        await fetchOrganizations()
    }

    const fetchOrganizations = async () => {
        try {
            const fetchedOrganizations = await getOrganizations()
            setOrganizations(fetchedOrganizations)
        } catch (error) {
            console.error('Error fetching organizations:', error)
            setError('Failed to fetch organizations. Please try again later.')
        } finally {
            setIsLoading(false)
        }
    }

    if (isLoading) {
        return <div className='h-[90vh] flex justify-center items-center'><Spinner /></div>
    }

    if (error) {
        return <div className="text-red-500">{error}</div>
    }

    if (organizations.length === 0) {
        return (
            <>
                <EmptyScreen
                    title='No Organizations Available'
                    buttonName='Join or Create'
                    buttonAction={handleOpenModal} />
                <OrgIdModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onSubmit={handleSubmitOrgId}
                />
            </>
        )
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {organizations.map((org) => (
                    <OrganizationCard
                        key={org._id}
                        name={org.name}
                        orgId={org.orgId}
                        adminCount={org.admins?.length}
                        memberCount={org.members?.length}
                        createdAt={org.createdAt}
                        updatedAt={org.updatedAt}
                    />
                ))}
            </div>
            <OrgIdModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleSubmitOrgId}
            />
        </>
    )
}

export default OrganizationsPage
