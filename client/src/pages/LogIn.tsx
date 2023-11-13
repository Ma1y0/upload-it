import { ChangeEvent, FormEvent, useState } from "react";
import { useUserStore } from "../lib/auth-state";
import toast from "react-hot-toast";

interface LogInState {
  email: string;
  password: string;
}

export default function LogIn() {
  // Auth store
  const { logIn } = useUserStore();

  const [formData, setFormData] = useState<LogInState>({
    email: "",
    password: "",
  });
  const [loaddinng, setLoadding] = useState(false);

  const onchange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadding(true);

    try {
      const res = await fetch("http://127.0.0.1/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const res_json = await res.json();
        logIn({
          id: res_json.id,
          assignments: res_json.assignments,
          name: res_json.name,
          email: res_json.email,
        });

        console.log({
          id: res_json.id,
          assignments: res_json.assignments,
          name: res_json.name,
          email: res_json.email,
        });

        console.log(res_json);

        toast.success("Loged In");
      } else {
        toast.error("Filed to log you in");
      }
    } catch (e) {
      console.error(e);
      toast.error("Filed to log you in");
    }

    setLoadding(false);
  };

  return (
    <div>
      <form
        onSubmit={onSubmit}
        className="flex flex-col items-center gap-2 bg-base-200 p-6"
      >
        <input
          value={formData.email}
          onChange={onchange}
          type="email"
          placeholder="email"
          name="email"
          className="input input-bordered w-full max-w-[20%]"
          required
        />
        <input
          value={formData.password}
          onChange={onchange}
          type="password"
          placeholder="password"
          name="password"
          className="input input-bordered w-full max-w-[20%]"
          required
        />
        <button
          type="submit"
          className={`btn ${loaddinng ? "btn-disabled" : "btn-success"}`}
        >
          Log In
        </button>
      </form>
      <button
        onClick={() =>
          logIn({
            id: "1234",
            name: "Matt",
            email: "matyas.barr@gmail.com",
            assignments: [
              {
                Id: "1",
                Title: "hello",
                Completed: 89,
                Due: new Date(2023, 10, 15),
                Description: "a",
              },
              {
                Id: "2",
                Title: "bye",
                Completed: 8,
                Due: new Date(2023, 10, 18),
                Description: "a",
              },
            ],
          })
        }
        className="btn btn-warning"
      >
        Debug Login
      </button>
    </div>
  );
}
