import { ReactNode} from "react";
import Header from "./Header";
// import { Bell, LogOut } from "lucide-react";
// import { useAuth } from "../../auth/AuthContext";


interface HeaderWithNotifProps {
    children?: ReactNode;
}

const HeaderWithNotif: React.FC<HeaderWithNotifProps> = ({ children }) => {
    // const { logout } = useAuth();


    return (
        <Header>
            {children}
            <div className="flex flex-row h-full items-center gap-6 mr-4 cursor-pointer">
                {/* <Bell />
                <LogOut color="red" className="cursor-pointer" onClick={logout}/> */}
            </div>
        </Header>
    );
};

export default HeaderWithNotif;
