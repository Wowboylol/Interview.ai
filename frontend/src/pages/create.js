import { useState, useRef } from "react";
import Snackbar from "../components/snackbar";

function Create() {
  const [prompt, setPrompt] = useState({
    name: "",
    position: "",
    technologies: "",
  });

  const SnackbarType = {
    success: "success",
    fail: "fail",
  };

  const snackbarRef = useRef(null);

  function displaySnackbar() {
    if (
      prompt.name === "" ||
      prompt.position === "" ||
      prompt.technologies === ""
    ) {
      snackbarRef.current.show();
    } else {
      const data = JSON.stringify(prompt);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center font-serif gap-8">
      <h1 className="text-3xl">Fill in the boxes to create a prompt</h1>
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
          <label className="pr-4">Technologies:</label>
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
            value={prompt.technologies}
            onChange={(e) =>
              setPrompt({
                ...prompt,
                technologies: e.target.value,
              })
            }
            placeholder="Required technologies"
          />
        </div>
      </div>
      <button
        className="border-2 border-black rounded-full shadow hover:shadow-md hover:opacity-50 p-4 transition duration-500"
        onClick={() => {
          displaySnackbar();
        }}
      >
        Create your prompt for your interview
      </button>
      <Snackbar
        ref={snackbarRef}
        message="One of the fields is not complete!"
        type={SnackbarType.fail}
      />
    </div>
  );
}

export default Create;
