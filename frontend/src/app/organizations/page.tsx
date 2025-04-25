'use client'

import getOrganizations from '@/apis/getOrganizations'
import EmptyScreen from '@/components/common/EmptyScreen'
import OrganizationCard from '@/components/organizations/OrganizationCard'
import OrganizationType from '@/types/organizationType'
import { Loader } from 'lucide-react'
import { useEffect, useState } from 'react'

const OrganizationsPage = () => {
    const [organizations, setOrganizations] = useState<OrganizationType[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

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

    if (isLoading) {
        return <div className='h-[90vh] flex justify-center items-center'><Loader className="animate-spin text-primary"/></div>
    }

    if (error) {
        return <div className="text-red-500">{error}</div>
    }

    if (organizations.length === 0) {
        return (
            <EmptyScreen
                title='No Organizations Available'
                buttonName='Join or Create'
                buttonAction={() => console.log('Button clicked!')} />
        )
    }

    return (
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
    )
}

export default OrganizationsPage
