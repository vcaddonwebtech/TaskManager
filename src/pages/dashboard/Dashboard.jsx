import {
    CheckCircle,
    Clock,
    FolderKanban,
    Users
} from "lucide-react";

const Dashboard = () => {

    const stats = [
        {
            title: "Completed Tasks",
            value: 28,
            icon: CheckCircle,
            gradient: "--card-color",
        },
        {
            title: "Pending Tasks",
            value: 6,
            icon: Clock,
            gradient: "--card-color",
        },
        {
            title: "Active Projects",
            value: 4,
            icon: FolderKanban,
            gradient: "--card-color",
        },
        {
            title: "Team Members",
            value: 12,
            icon: Users,
            gradient: "--card-color",
        },
    ];

    return (
        <div className="space-y-6">

            {/* Page Title */}
            <div>
                <h2 className="text-2xl font-bold text-(--text-color)">
                    Dashboard Overview
                </h2>
                <p className="text-gray-500 text-sm">
                    Summary of your company performance
                </p>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                {stats.map((item, index) => {
                    const Icon = item.icon;

                    return (
                        <div
                            key={index}
                            className={`relative p-6 rounded-2xl text-(--primary-color) shadow-lg 
                            bg-(--card-color) ${item.gradient} 
                           border-2 border-blue-300 hover:border-4 hover:scale-101 transition duration-200 ease-in`}
                        >
                            <div className="flex justify-between items-center">

                                <div>
                                    <p className="text-sm opacity-90">
                                        {item.title}
                                    </p>
                                    <h3 className="text-3xl font-bold mt-2">
                                        {item.value}
                                    </h3>
                                </div>

                                <div className="bg-white/20 p-3 rounded-xl">
                                    <Icon size={24} />
                                </div>

                            </div>
                        </div>
                    );
                })}

            </div>

        </div>
    );
};

export default Dashboard;
