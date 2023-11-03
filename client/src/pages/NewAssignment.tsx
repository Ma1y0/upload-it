import { ChangeEvent, FormEvent, useState } from "react";
import { useUserStore } from "../lib/auth-state";
import { Navigate } from "react-router-dom";

export default function NewAssignment() {
  // loads user's data
  const { user } = useUserStore();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    due: "",
  });

  const change = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("http://127.0.0.1/api/v1/assignment", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        console.error(await res.json());
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      {user ? (
        <main className="flex justify-center">
          <form
            className="flex flex-col items-center gap-2 p-6 min-w-[80%]"
            onSubmit={submit}
          >
            <input
              value={formData.title}
              onChange={change}
              name="title"
              placeholder="Title"
              className="input input-bordered w-full max-w-xs"
              required
            />
            <input
              value={formData.description}
              onChange={change}
              name="description"
              placeholder="Description"
              className="input input-bordered w-full max-w-xs"
              required
            />
            <input
              value={formData.due}
              onChange={change}
              name="due"
              placeholder="Due"
              type="date"
              className="input input-bordered w-full max-w-xs"
            />

            <button type="submit" className="btn btn-success">
              Create
            </button>
          </form>
        </main>
      ) : (
        <Navigate to={"/login"} />
      )}
    </>
  );
}
