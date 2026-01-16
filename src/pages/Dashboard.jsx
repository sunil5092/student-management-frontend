import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import AddStudent from "../components/AddStudent";
import { useStudents } from "../hooks/useStudents";

function Dashboard() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const { students, loading, addStudent, deleteStudent } = useStudents();

  return (
    <div>
      <h2>Dashboard</h2>

      <button
        onClick={() => {
          logout();
          navigate("/login");
        }}
      >
        Logout
      </button>

      <AddStudent onStudentAdded={addStudent} />

      {loading && <p>Loading...</p>}
      {!loading && students.length === 0 && <p>No students found</p>}

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>
                <button onClick={() => deleteStudent(student.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
