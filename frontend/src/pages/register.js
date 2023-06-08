import { useState } from "react";
import { registerAPI } from "../services/userService";
import { BiShow, BiHide } from "react-icons/bi";

function Register() {
  const [details, setDetails] = useState({ email: "", password: "" });
  const [reveal, setReveal] = useState(false);
  async function signup() {
    const data = await registerAPI(details);
    console.log(data);
    // console.log(data["message"]);

    // if (data["message"] === "Registration successful") {
    //   window.location.href = "/";
    // }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center font-serif font-semibold gap-8">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-3xl"> Interview.ai</h1>
        <p> Sign up and start practicing for your interviews!</p>
      </div>
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
        <div className="flex items-center space-x-1 pt-4">
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
          <button onClick={() => setReveal(!reveal)}>
            {reveal ? <BiHide size={20} /> : <BiShow size={20} />}
          </button>
        </div>
      </div>
      <button
        className="border-2 border-black rounded-full shadow hover:shadow-md hover:opacity-50 p-4 transition duration-500"
        onClick={() => {
          signup();
        }}
      >
        Sign up
      </button>
    </div>
  );
}

export default Register;
