import { useNavigate } from "react-router-dom";
import { checkSession } from "../services/userService";

function Home() {
  const navigate = useNavigate();
  const create = "/create";
  const view = "/view";
  const login = "/login";

  async function session() {
    var valid = await checkSession();
    if (valid["session"] === true) {
      navigate(view);
    } else {
      navigate(login);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 font-serif font-semibold">
      <h1 className="text-4xl text-center justify-center">Interview.ai</h1>
      <p>
        An application that allows you to practice for your important interviews
      </p>
      <div className="pt-4 space-x-12">
        <button
          className="border-2 border-black rounded-full shadow hover:shadow-md hover:opacity-50 p-4 transition duration-500"
          onClick={() => navigate(create)}
        >
          Create a new prompt
        </button>
        <button
          className="border-2 border-black rounded-full shadow hover:shadow-md hover:opacity-50 p-4 transition duration-500"
          onClick={() => navigate(view)}
        >
          View existing prompts
        </button>
      </div>
    </div>
  );
}

export default Home;
