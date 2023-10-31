import { ChangeEvent, FormEvent, useState } from "react";
import { useUserStore } from "../lib/auth-state";
import { Navigate } from "react-router-dom";

export default function NewAssignment() {
  // loads user's data
  const { user } = useUserStore();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const change = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
              placeholder="title"
              className="input input-bordered w-full max-w-xs"
            />
            <input
              value={formData.description}
              onChange={change}
              name="description"
              placeholder="description"
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
