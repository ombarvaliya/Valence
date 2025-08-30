'use client';

interface StatCardProps {
  icon: string;
  label: string;
  value: string;
  unit: string;
  colorClass: string;
}

const StatCard = ({ icon, label, value, unit, colorClass }: StatCardProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center space-x-4">
      <div className={`text-3xl ${colorClass}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-xl font-bold text-gray-800">
          {value} <span className="text-base font-normal text-gray-600">{unit}</span>
        </p>
      </div>
    </div>
  );
};

export default StatCard;