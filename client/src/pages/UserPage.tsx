import { useUserStore } from "../lib/auth-state";
import { Navigate } from "react-router-dom";

export default function UserPage() {
  const { user } = useUserStore();

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
            <ul>
              {user.asssignments.map((asssignment) => (
                <li key={asssignment.id}>{asssignment.title}</li>
              ))}
            </ul>
          </div>
        </main>
      )}
    </>
  );
}
