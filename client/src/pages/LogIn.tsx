import { ChangeEvent, FormEvent, useState } from "react";
import { useUserStore } from "../lib/auth-state";
import { redirect } from "react-router-dom";

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

  const onchange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("http://127.0.0.1:8080/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }).then((res) => res.json());

      logIn({ id: res.jwt });

      redirect("/");
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
        <button type="submit" className="btn btn-primary">
          Log In
        </button>
      </form>
    </div>
  );
}
