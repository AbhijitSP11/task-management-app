import { AlertCircle, CheckCircle2, Clock, ArrowUpCircle, CircleDot } from 'lucide-react';

export const priorityOptions = [
  { value: 'High', label: 'High', icon: <AlertCircle className="w-5 h-5 text-red-500" /> },
  { value: 'Medium', label: 'Medium', icon: <ArrowUpCircle className="w-5 h-5 text-yellow-500" /> },
  { value: 'Low', label: 'Low', icon: <CircleDot className="w-5 h-5 text-green-500" /> },
];

export const statusOptions = [
  { value: 'To Do', label: 'To Do', icon: <Clock className="w-5 h-5 text-blue-500" /> },
  { value: 'In Progress', label: 'In Progress', icon: <ArrowUpCircle className="w-5 h-5 text-yellow-500" /> },
  { value: 'Blocked', label: 'Blocked', icon: <AlertCircle className="w-5 h-5 text-red-500" /> },
  { value: 'Completed', label: 'Completed', icon: <CheckCircle2 className="w-5 h-5 text-green-500" /> },
  { value: 'In Review', label: 'In Review', icon: <CircleDot className="w-5 h-5 text-purple-500" /> },
];