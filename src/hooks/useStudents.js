import { useEffect, useState } from "react";
import api from "../services/api";

export function useStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStudents = async () => {
    try {
      const res = await api.get("/students");
      // The API returns a paginated object { total, items }; the UI needs the array.
      setStudents(Array.isArray(res.data) ? res.data : res.data.items ?? []);
    } finally {
      setLoading(false);
    }
  };

  const addStudent = async (student) => {
    const res = await api.post("/students", student);
    setStudents((prev) => [...prev, res.data]);
  };

  const deleteStudent = async (id) => {
    await api.delete(`/students/${id}`);
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return { students, loading, addStudent, deleteStudent };
}
