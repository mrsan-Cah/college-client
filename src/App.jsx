import { BrowserRouter, Routes, Route } from "react-router-dom";

// Home
import Home from "./pages/Home";

// Admin Auth
import AdminLogin from "./pages/auth/AdminLogin";
import AdminRegister from "./pages/auth/AdminRegister";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageStaff from "./pages/admin/ManageStaff";
import ManageStudents from "./pages/admin/ManageStudents";
import ManageSubjects from "./pages/admin/ManageSubjects";
import Events from "./pages/admin/Events";
import Notices from "./pages/admin/Notices";
import Timetable from "./pages/admin/Timetable";

// Staff Auth
import StaffLogin from "./pages/auth/StaffLogin";

// Staff Dashboard
import StaffDashboard from "./pages/staff/StaffDashboard";
import AddStudent from "./pages/staff/AddStudent";
import Attendance from "./pages/staff/Attendance";
import Marks from "./pages/staff/Marks";
import UploadNotes from "./pages/staff/UploadNotes";
import GeneratePDF from "./pages/staff/GeneratePDF";

// Student Auth
import StudentLogin from "./pages/auth/StudentLogin";

// Student Layout & Pages
import StudentLayout from "./pages/student/StudentLayout";
import StudentProfile from "./pages/student/StudentProfile";
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentSubjects from "./pages/student/StudentSubjects";
import ViewMarks from "./pages/student/ViewMarks";
import ViewNotes from "./pages/student/ViewNotes";
import ViewNotices from "./pages/student/ViewNotices";
import ViewEvent from "./pages/student/ViewEvent";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/staff" element={<ManageStaff />} />
        <Route path="/admin/students" element={<ManageStudents />} />
        <Route path="/admin/subjects" element={<ManageSubjects />} />
        <Route path="/admin/events" element={<Events />} />
        <Route path="/admin/notices" element={<Notices />} />
        <Route path="/admin/timetable" element={<Timetable />} />

        {/* Staff */}
        <Route path="/staff/login" element={<StaffLogin />} />
        <Route path="/staff/dashboard" element={<StaffDashboard />}>
          <Route index element={<Attendance />} />
          <Route path="addstudent" element={<AddStudent />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="marks" element={<Marks />} />
          <Route path="uploadnotes" element={<UploadNotes />} />
          <Route path="generatepdf" element={<GeneratePDF />} />
        </Route>

        {/* Student */}
        <Route path="/student/login" element={<StudentLogin />} />

        <Route path="/student/dashboard" element={<StudentLayout />}>
  <Route element={<StudentDashboard />}>
    {/* 👇 FIRST PAGE */}
    <Route index element={<StudentProfile />} />

    <Route path="subjects" element={<StudentSubjects />} />
    <Route path="marks" element={<ViewMarks />} />
    <Route path="notes" element={<ViewNotes />} />
    <Route path="notices" element={<ViewNotices />} />
    <Route path="events" element={<ViewEvent />} />
  </Route>
</Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
