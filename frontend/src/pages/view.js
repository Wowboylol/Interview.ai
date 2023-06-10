import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loadPrompt } from "../services/userService";
import Loader from "../components/loader";
import { startInterview } from "../services/userService";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";

function View() {
  const home = "/";
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  useEffect(() => {
    loadPrompt().then((value) => setData(value));
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
            <Prompt
              key={index}
              id={element._id}
              name={element.name}
              position={element.position}
              job_reqs={element.job_reqs}
            />
          ))}
        </section>
      </div>
    </div>
  );
}

function Prompt(props) {
  const navigate = useNavigate();
  const practice = "/practice";
  const edit = "/edit";
  const id = props.id;
  const name = props.name;
  const position = props.position;
  const job_reqs = props.job_reqs;

  async function goPractice(name, position, job_reqs) {
    const data = await startInterview({ name, position, job_reqs });
    navigate(practice, { state: { data } });
  }

  return (
    <button
      onClick={() => goPractice(name, position, job_reqs)}
      className="m-4 flex flex-col rounded-xl border-2 p-4 text-left"
    >
      <div className="flex w-full">
        <div className="w-full">
          <i>{name}</i>
          <h1 className="text-2xl font-extrabold">{position}</h1>
          <div className="text-accent">Job requirements: {job_reqs}</div>
        </div>
        <div>
          <button
            onClick={(e) => {
              navigate(edit, { state: { id, name, position, job_reqs } });
              e.stopPropagation();
            }}
          >
            <BiEdit />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <RiDeleteBinLine />
          </button>
        </div>
      </div>
    </button>
  );
}

export default View;
