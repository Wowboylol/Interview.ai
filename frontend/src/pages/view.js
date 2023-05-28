import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loadPrompt } from "../services/userService";
import Loader from "../components/loader";

function View() {
  const home = "/";
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  useEffect(() => {
    loadPrompt().then((value) => setData(data => [...data, value]));
    console.log("idk")
  }, []);

  if (!data) {
    return (
      <Loader/>
    );
  }

  return (
    <div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h1 className="p-r py-10 px-4 text-3xl font-extrabold">
            Previous interview prompts
          </h1>
          <button
            onClick={() => navigate(home)}
            className="border-2 border-black rounded-full shadow hover:shadow-md hover:opacity-50 p-4 transition duration-500"
          >
            Home Page
          </button>
        </div>
        <section
          className="grid auto-rows-fr grid-cols-4"
        >
          {/* {data.products.map((presentation, i) => (
            <PresentationCard
              presentation={presentation}
              key={i}
            ></PresentationCard>
          ))} */}
        </section>
        {
  console.log(data)}
      </div>
    </div>
  );
}

// function PresentationCard(data) {
//   const navigate = useNavigate();
//   return (
//     <button
//     onClick={() => navigate("/practice", {state: {data}})}
//       className="m-4 flex flex-col rounded-xl border-2 p-4 text-left"
//     >
//       <div className="h-4 w-full"></div>
//       <i>{data.name}</i>
//       <h1 className="text-2xl font-extrabold">{data.position}</h1>
//       <div className="text-accent">
//         Job requirements: {data.job_reqs}
//       </div>
//     </button>
//   );
// }

export default View;
  