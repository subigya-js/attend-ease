import React from 'react'

interface PageProps {
    params: {
        orgId: string
    }
}

const Page = ({ params }: PageProps) => {
    const { orgId } = params

    return (
        <div>Organization Page: {orgId}</div>
    )
}

export default Page
