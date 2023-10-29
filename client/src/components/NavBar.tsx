import { NavLink } from "react-router-dom";
import { useUserStore } from "../lib/auth-state";

export default function NavBar() {
  const { user, logOut } = useUserStore();

  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <NavLink to="/" className="btn btn-ghost normal-case text-xl">
            daisyUI
          </NavLink>
        </div>
        <div className="flex-none gap-2">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
            />
          </div>
          {user ? (
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
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <p>Hello</p>
                </li>
                <li>
                  <a onClick={() => logOut()}>Logout</a>
                </li>
              </ul>
            </div>
          ) : (
            <NavLink to="/logIn">Log In</NavLink>
          )}
        </div>
      </div>
    </>
  );
}
