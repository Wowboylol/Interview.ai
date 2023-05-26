import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loadPrompt } from "../services/userService";

function View() {
  const navigate = useNavigate();
  const home = "/";
  const practice = "/practice";

  async function getData()
  {
    const data = await loadPrompt();
    console.log(data);
  }

  return (
    <div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h1 className="p-r py-10 px-4 text-3xl font-extrabold">
            Previous interview prompts
          </h1>
          <button
            onClick={() => getData()}
            className="border-2 border-black rounded-full shadow hover:shadow-md hover:opacity-50 p-4 transition duration-500"
          >
            Home Page
          </button>
        </div>
        <section
          className="grid auto-rows-fr grid-cols-4"
        >
          {/* {data.map((presentation, i) => (
            <PresentationCard
              presentation={presentation}
              key={i}
            ></PresentationCard>
          ))} */}
        </section>
      </div>
    </div>
  );
}

// const PresentationCard = ({
//   presentation,
// }) => {
//   return (
//     <button
//       className="m-4 flex flex-col rounded-xl border-2 p-4 text-left"
//       onClick={() => navigate(practice, {state: {data}})}
//     >
//       <div className="h-4 w-full"></div>
//       <i>{presentation.createdAt.toDateString()}</i>
//       <h1 className="text-2xl font-extrabold">{presentation.title}</h1>
//       <div className="text-accent">
//         Goal time: {Math.round((presentation.idealTime / 60) * 100) / 100}{" "}
//         minutes
//       </div>
//     </button>
//   );
// };

export default View;
  