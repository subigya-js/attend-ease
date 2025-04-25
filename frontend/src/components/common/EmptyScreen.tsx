import { Button } from "../ui/button"

interface EmptyScreenProps {
    title?: string
    buttonName?: string
    buttonAction?: () => void
}

const EmptyScreen = ({ title, buttonName, buttonAction }: EmptyScreenProps) => {
    return (
        <div className='min-h-[90vh]'>
            <div className='flex flex-col items-center justify-center gap-4 min-h-[90vh]'>
                <h1>{title}</h1>
                <Button variant="outline" onClick={buttonAction}>{buttonName}</Button>
            </div>
        </div>
    )
}

export default EmptyScreen