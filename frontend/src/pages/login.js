import { useState } from "react";
import { loginAPI } from "../services/userService";

function Login() {
    const [details, setDetails] = useState({email: "", password: ""});
    async function login() {
        const data = await loginAPI(details);
        console.log(data['message']);

        if(data['message'] === "Login successful") {
            window.location.href = '/view-prompts';
        }
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center font-serif font-semibold gap-8"> 
            <div>
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
            <div>
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
                    value={details.password}
                    onChange={(e) =>
                    setDetails({
                        ...details,
                        password: e.target.value,
                    })
                    }
                    placeholder="Password"
                />
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
    )
}

export default Login;