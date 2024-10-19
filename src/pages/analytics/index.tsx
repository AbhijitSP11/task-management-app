import Head from "next/head";
import { useState, useEffect } from "react";
import { Tasks } from "@/schema/tasks";
import { 
  CheckCircle, 
  Clock, 
  Users, 
  Briefcase,
} from "lucide-react";

type StatBoxProps = {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
};

const StatBox: React.FC<StatBoxProps> = ({ title, value, icon, color }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 dark:text-gray-400 text-sm">{title}</p>
        <p className="text-3xl font-bold mt-1">{value}</p>
      </div>
      <div className={`${color} p-3 rounded-full`}>{icon}</div>
    </div>
  </div>
);

const TeamMemberRow: React.FC<{ name: string; role: string; tasks: number }> = ({ name, role, tasks }) => (
  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
    <td className="px-6 py-4 whitespace-nowrap">{name}</td>
    <td className="px-6 py-4 whitespace-nowrap">{role}</td>
    <td className="px-6 py-4 whitespace-nowrap">{tasks}</td>
  </tr>
);

const Analytics = () => {
  const [completedTasks, setCompletedTasks] = useState(0);
  const [inProgressTasks, setInProgressTasks] = useState(0);
  const [totalProjects, setTotalProjects] = useState(0);

  useEffect(() => {
    const completed = Tasks.filter(task => task.status === "Done").length;
    const inProgress = Tasks.filter(task => task.status === "In Progress").length;
    const projects = new Set(Tasks.map(task => task.projectId)).size;

    setCompletedTasks(completed);
    setInProgressTasks(inProgress);
    setTotalProjects(projects);
  }, []);

  return (
    <>
      <Head>
        <title>Twello - Task Management Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen bg-gray-100">
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Dashboard</h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <StatBox title="Completed Tasks" value={completedTasks} icon={<CheckCircle size={24} />} color="bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300" />
              <StatBox title="In Progress" value={inProgressTasks} icon={<Clock size={24} />} color="bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300" />
              <StatBox title="Team Members" value={15} icon={<Users size={24} />} color="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300" />
              <StatBox title="Total Projects" value={totalProjects} icon={<Briefcase size={24} />} color="bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300" />
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Members</h3>
              <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Role</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Tasks</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      <TeamMemberRow name="John Doe" role="Developer" tasks={3} />
                      <TeamMemberRow name="Jane Smith" role="Designer" tasks={2} />
                      <TeamMemberRow name="Mike Johnson" role="Project Manager" tasks={5} />
                      <TeamMemberRow name="Alice Green" role="QA Tester" tasks={4} />
                      <TeamMemberRow name="Tom Brown" role="Developer" tasks={3} />
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Analytics;