import { ChangeEvent, FormEvent, useState } from "react";
import { useUserStore } from "../lib/auth-state";

export default function Register() {
  const { logIn } = useUserStore();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const onchange = (e: ChangeEvent<HTMLInputElement>) => {
    setErrorMessage("");
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password != formData.password2) {
      setErrorMessage("Passwords don't match");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1/api/v1/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (res.ok) {
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
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <form
        onSubmit={onSubmit}
        className="flex flex-col items-center gap-2 bg-base-200 p-6"
      >
        <input
          value={formData.name}
          onChange={onchange}
          type="text"
          placeholder="name"
          name="name"
          className="input input-bordered w-full max-w-[20%]"
          required
        />
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
        <input
          value={formData.password2}
          onChange={onchange}
          type="password"
          placeholder="password"
          name="password2"
          className="input input-bordered w-full max-w-[20%]"
          required
        />
        <div className="flex items-center gap-4">
          <p className="text-red-500">{errorMessage}</p>
          <button
            type="submit"
            className="btn bg-yellow-500 border-transparent hover:bg-yellow-600 text-white"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
