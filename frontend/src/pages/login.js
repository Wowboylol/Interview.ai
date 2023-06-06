import { useState } from "react";
import { loginAPI } from "../services/userService";
import { BiShow, BiHide } from "react-icons/bi";

function Login() {
  const [details, setDetails] = useState({ email: "", password: "" });
  const [reveal, setReveal] = useState(false);
  async function login() {
    const data = await loginAPI(details);
    console.log(data["message"]);

    if (data["message"] === "Login successful") {
      window.location.href = "/";
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center font-serif font-semibold gap-8">
      <h1 className="text-3xl"> Enter your email and password to continue</h1>
      <div>
        <div>
          <input
            className="
            form-control
            m-0
            block
            w-50
            rounded
            border
            border-solid
            border-gray-300
            bg-white bg-clip-padding
            px-3 py-1.5 text-sm
            font-normal
            text-gray-700
            transition
            ease-in-out
            focus:border-accent focus:bg-white focus:text-gray-700 focus:outline-none
        "
            value={details.email}
            onChange={(e) =>
              setDetails({
                ...details,
                email: e.target.value,
              })
            }
            placeholder="Email"
          />
        </div>
        <div className="flex items-center space-x-1 pt-8">
          <input
            className="
                form-control
                m-0
                block
                w-full
                rounded
                border
                border-solid
                border-gray-300
                bg-white bg-clip-padding
                px-3 py-1.5 text-sm
                font-normal
                text-gray-700
                transition
                ease-in-out
                focus:border-accent focus:bg-white focus:text-gray-700 focus:outline-none
            "
            type={reveal ? "text" : "password"}
            value={details.password}
            onChange={(e) =>
              setDetails({
                ...details,
                password: e.target.value,
              })
            }
            placeholder="Password"
          />
          <button
          onClick={() => setReveal(!reveal)}>
            {reveal ? <BiHide size={20}/> : <BiShow size={20}/>}
          </button>
        </div>
      </div>
      <button
        className="border-2 border-black rounded-full shadow hover:shadow-md hover:opacity-50 p-4 transition duration-500"
        onClick={() => {
          login();
        }}
      >
        Login
      </button>
    </div>
  );
}

export default Login;
