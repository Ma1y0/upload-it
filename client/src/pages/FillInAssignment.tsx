import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Assignment } from "../lib/auth-state";
import Spinner from "../components/Spinner";

export default function FillInAssignment() {
  const { id } = useParams();
  const [assignment, setAssignment] = useState<Assignment | null>(null);

  // Fetch the Assignmet's details
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://127.0.0.1/api/v1/assignment/${id}`,
        ).then((res) => res.json());
        setAssignment(res.assignment);
      } catch (e) {}
    };
    fetchData();
  }, []);

  return (
    <>
      {!assignment ? (
        <Spinner />
      ) : (
        <>
          <main>
            <h1>{assignment.Title}</h1>
            <p>{assignment.Description}</p>
          </main>
        </>
      )}
    </>
  );
}
