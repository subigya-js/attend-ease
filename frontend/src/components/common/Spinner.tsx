import { Loader2 } from "lucide-react"

const Spinner = () => {
    return (
        <div className='h-[90vh] flex justify-center items-center'>
            <Loader2 className="animate-spin text-primary" />
        </div>
    )
}

export default Spinner