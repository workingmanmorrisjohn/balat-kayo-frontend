import { LucideProps } from "lucide-react";

interface StatWithIconProps {
    title: string,
    value: string,
    description: string,
    icon: React.FC<LucideProps>
}

const StatWithIcon = (props: StatWithIconProps) => {
    return (
        <div className="stats shadow">
            <div className="stat">
                <div className="stat-figure">
                    <props.icon size={35}/>
                </div>
                <div className="stat-title">{props.title}</div>
                <div className="stat-value">{props.value}</div>
                <div className="stat-desc">{props.description}</div>
            </div>
        </div>

    )
}

export default StatWithIcon;