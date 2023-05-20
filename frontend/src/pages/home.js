import { useNavigate } from "react-router-dom";

function Home() {
  let navigate = useNavigate();
  let create = "/create"

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-4xl text-center justify-center">Interview.ai</h1>
      <button onClick={() => navigate(create)}>Create a new prompt</button>
    </div>
  );
}

export default Home;
