import { Loader } from 'lucide-react'


const PageLoader = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <Loader className="size-8 animate-spin text-primary" />
        </div>
    )
}

export default PageLoader