import { useOutletContext } from "react-router-dom";
import { FaIdBadge, FaUniversity, FaLayerGroup, FaCalendarAlt, FaBook } from "react-icons/fa";

const InfoRow = ({ label, value, icon }) => (
  <div className="flex items-center gap-4 p-4 border-b hover:bg-gray-50 transition-colors rounded-md">
    <div className="text-blue-500 text-lg">{icon}</div>
    <div className="flex flex-col sm:flex-row justify-between w-full">
      <span className="text-gray-500 text-sm sm:text-base">{label}</span>
      <span className="font-medium text-gray-800 text-sm sm:text-base">{value}</span>
    </div>
  </div>
);

const StudentProfile = () => {
  const { student } = useOutletContext();

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-500 p-6 text-white">
        <h1 className="text-2xl sm:text-3xl font-bold mb-1">
          Welcome, {student.name} 👋
        </h1>
        <p className="text-sm sm:text-base text-blue-100">
          Here’s your profile overview
        </p>
      </div>

      {/* Profile Info */}
      <div className="p-6 space-y-3">
        <InfoRow icon={<FaIdBadge />} label="Roll No" value={student.rollNo} />
        <InfoRow icon={<FaUniversity />} label="Department" value={student.department} />
        <InfoRow icon={<FaLayerGroup />} label="Section" value={student.section} />
        <InfoRow icon={<FaBook />} label="Year" value={student.year} />
        <InfoRow icon={<FaBook />} label="Semester" value={student.semester} />
        <InfoRow icon={<FaCalendarAlt />} label="Date of Birth" value={new Date(student.dob).toLocaleDateString()} />
      </div>
    </div>
  );
};

export default StudentProfile;
