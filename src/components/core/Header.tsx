import { ReactNode } from "react";

interface HeaderProps {
    children?: ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
    return (
        <div className="h-20 bg-white mb-4 -m-4 px-4 rounded-b-[30px] shadow-lg flex flex-row items-center justify-between">
            {children}
        </div>
    )
}

export default Header;