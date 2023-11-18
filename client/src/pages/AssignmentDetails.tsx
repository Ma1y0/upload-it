import { NavLink, useParams } from "react-router-dom";
import { Assignment, useUserStore } from "../lib/auth-state";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import toast from "react-hot-toast";

export default function () {
  const { id } = useParams();
  const { user } = useUserStore();

  const [assignment, setAssignment] = useState<Assignment | null>(null);

  // Fetch assignment data
  useEffect(() => {
    const fetch_data = async () => {
      try {
        const res = await fetch(`http://127.0.0.1/api/v1/assignment/${id}`);

        if (res.ok) {
          const json_data = await res.json();
          console.log(json_data);
          setAssignment(json_data.assignment);
        } else {
          toast.error("Failed to fetch assignment data");
        }
      } catch (e) {
        toast.error("Failed to fetch assignment data");
      }
    };

    fetch_data();
  }, [user]);

  return (
    <>
      {!user ? (
        <NavLink to={"/login"} />
      ) : (
        <>
          <main>
            {!assignment ? (
              <Spinner />
            ) : (
              <>
                <button onClick={() => console.log(assignment)}>
                  Click Me
                </button>
                <h1>{assignment.Title}</h1>
              </>
            )}
          </main>
        </>
      )}
    </>
  );
}
