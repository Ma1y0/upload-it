import { NavLink } from "react-router-dom";
import { useUserStore } from "../lib/auth-state";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function NavBar() {
  const { user, logOut, update } = useUserStore();

  useEffect(() => {
    update();
    console.log(user);
  }, []);

  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <NavLink to="/" className="btn btn-ghost normal-case text-xl">
            Home
          </NavLink>
        </div>
        <div className="flex-none gap-2">
          {user ? (
            <>
              <div>
                <NavLink to="/assignment/new" className="btn btn-primary">
                  New
                </NavLink>
              </div>
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img src="/no-user-image-icon.jpg" />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                >
                  <li>
                    <NavLink to="/profile" className="justify-between">
                      Profile
                    </NavLink>
                  </li>
                  <li>
                    <p>Hello</p>
                  </li>
                  <li>
                    <a
                      onClick={() => {
                        logOut();
                        toast.success("You've been successfully logged out");
                      }}
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <ul className="flex gap-3">
              <li>
                <NavLink to="/logIn" className="btn btn-primary">
                  Log In
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/register"
                  className="btn bg-yellow-500 border-transparent hover:bg-yellow-600 text-white"
                >
                  {" "}
                  Register
                </NavLink>
              </li>
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
