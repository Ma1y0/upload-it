import { useEffect } from "react";
import AssignmentCard from "../components/AssignmentCard";
import { useUserStore } from "../lib/auth-state";
import { Navigate } from "react-router-dom";

export default function UserPage() {
  const { user, update } = useUserStore();

  useEffect(() => {
    update();
  }, []);

  return (
    <>
      {!user ? (
        <Navigate to="/login" />
      ) : (
        <main>
          <div>
            <h1>{user.name}</h1>
          </div>
          <div>
            <ul className="flex flex-col items-center gap-2">
              {user.assignments.map((assignment) => (
                <li key={assignment.Id} className="w-[70%]">
                  <AssignmentCard assignment={assignment} />
                </li>
              ))}
            </ul>
          </div>
        </main>
      )}
    </>
  );
}
