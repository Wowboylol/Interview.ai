import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { startInterview, savePrompt } from "../services/userService";
import Snackbar from "../components/snackbar";

function Create() {
  const [prompt, setPrompt] = useState({
    name: "",
    position: "",
    job_requirements: "",
  });
  const SnackbarType = {
    success: "success",
    fail: "fail",
  };
  const snackbarRef = useRef(null);
  const navigate = useNavigate();
  const home = "/";
  const practice = "/practice";
  async function displaySnackbar() {
    if (
      prompt.name === "" ||
      prompt.position === "" ||
      prompt.job_requirements === ""
    ) {
      snackbarRef.current.show();
    } else {
      const data = await startInterview(prompt);
      await savePrompt(prompt);
      navigate(practice, { state: { data } });
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center font-serif font-semibold gap-8">
      <h1 className="text-3xl">
        Fill in the boxes to create a prompt for the interview
      </h1>
      <div>
        <div className="flex items-center pb-3">
          <label className="pr-4">Name:</label>
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
            value={prompt.name}
            onChange={(e) =>
              setPrompt({
                ...prompt,
                name: e.target.value,
              })
            }
            placeholder="Your name"
          />
        </div>
        <div className="flex items-center pb-3">
          <label className="pr-4">Position:</label>
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
            value={prompt.position}
            onChange={(e) =>
              setPrompt({
                ...prompt,
                position: e.target.value,
              })
            }
            placeholder="Job position"
          />
        </div>
        <div className="flex items-center">
          <label className="pr-4">Job Requirements:</label>
          <textarea
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
            value={prompt.job_requirements}
            onChange={(e) =>
              setPrompt({
                ...prompt,
                job_requirements: e.target.value,
              })
            }
            placeholder="Job requirements"
          />
        </div>
        <p className="text-sm">* The technologies required for the job</p>
      </div>
      <button
        className="border-2 border-black rounded-full shadow hover:shadow-md hover:opacity-50 p-4 transition duration-500"
        onClick={() => {
          displaySnackbar();
        }}
      >
        Create prompt
      </button>
      <Snackbar
        ref={snackbarRef}
        message="One of the fields is not complete!"
        type={SnackbarType.fail}
      />
      <button
        className="border-2 border-black rounded-full shadow hover:shadow-md hover:opacity-50 p-4 transition duration-500"
        onClick={() => {
          navigate(home);
        }}
      >
        Home page
      </button>
    </div>
  );
}

export default Create;
