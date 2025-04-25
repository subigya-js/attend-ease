'use client'

import EmptyScreen from '@/components/common/EmptyScreen'
import getOrganizations from '@/apis/getOrganizations'

const NoOrganizations = () => {
    return (
        <EmptyScreen
            title='No Organizations Available'
            buttonName='Join or Create'
            buttonAction={() => console.log('Button clicked!')} />
    )
}

const page = () => {
    const fetchOrganizations = async () => {
        try {
            const organizations = await getOrganizations()
            console.log('Organizations page.tsx:', organizations)
        } catch (error) {
            console.error('Error fetching organizations:', error)
        }
    }
    fetchOrganizations()
    return (
        <div>
            <NoOrganizations />
        </div>
    )
}

export default page
