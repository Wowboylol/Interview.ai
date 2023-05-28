import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loadPrompt } from "../services/userService";
import Loader from "../components/loader";
import { startInterview } from "../services/userService";

function View() {
  const home = "/";
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  useEffect(() => {
    loadPrompt().then((value) => setData((data) => [...data, value]));
  }, []);

  if (!data) {
    return <Loader />;
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
        <section className="grid auto-rows-fr grid-cols-4">
          {data.map((element, index) => (
            <Prompt key={index} name={element[index].name} position={element[index].position} job_reqs={element[index].job_reqs}/>
          ))}
        </section>
      </div>
    </div>
  );
}

function Prompt(props) {
  const navigate = useNavigate();
  const practice = "/practice"
  const name = props.name;
  const position = props.position;
  const job_reqs = props.job_reqs
  
  async function goPractice(name, position, job_reqs) {
    const data = await startInterview({name, position, job_reqs})
    navigate(practice, {state: {data}});
  }

  return (
    <button
    // onClick={() => navigate("/practice", {state: {name, position, job_reqs}})}

    onClick={() => goPractice(name, position, job_reqs)}
      className="m-4 flex flex-col rounded-xl border-2 p-4 text-left"
    >
      <div className="h-4 w-full"></div>
      <i>{name}</i>
      <h1 className="text-2xl font-extrabold">{position}</h1>
      <div className="text-accent">
        Job requirements: {job_reqs}
      </div>
    </button>
  );
}

export default View;
