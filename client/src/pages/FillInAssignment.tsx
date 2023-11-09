import { useParams } from "react-router-dom";

export default function FillInAssignment() {
  const { id } = useParams();
  return (
    <main>
      <h1>A</h1>
      {id}
    </main>
  );
}
