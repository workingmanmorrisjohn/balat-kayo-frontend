import { ReactNode } from "react";

interface PageProps {
    children?: ReactNode;
}

const Page: React.FC<PageProps> = ({children }) => {
    return ( 
        <div className="relative bg-slate-100 overflow-auto h-screen p-4">
            {children}
        </div>
    )
}

export default Page;