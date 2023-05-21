import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

function Results() {
  const location = useLocation();
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const home = "/";
  const questions = location.state.data;
  const answers = location.state.responses;
  let currentQuestion = questions[index];
  let currentAnswer = answers[index];

  function decrement() {
    if (index > 0) {
      setIndex(index - 1);
    }
  }

  function increment() {
    if (index < questions.length - 1) {
      setIndex(index + 1);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center font-serif gap-2">
      <h1 className="text-3xl pt-5">Great work!</h1>
      <h1 className="text-xl pb-10">
        Here's a recap of your answers to the following questions!
      </h1>
      <div className="border-solid border-2 px-2 border-black flex flex-col gap-10 w-2/5 h-80 overflow-auto">
        <div className="text-center">{currentQuestion}</div>
        <div className="break-normal">
          {currentAnswer}
        </div>
      </div>
      <div className="flex space-x-12 pb-10">
        <button onClick={decrement}>
          <AiOutlineArrowLeft size="35px" />
        </button>
        <button onClick={increment}>
          <AiOutlineArrowRight size="35px" />
        </button>
      </div>
      <button
        className="border-2 border-black rounded-full shadow hover:shadow-md hover:opacity-50 p-4 transition duration-500 "
        onClick={() => {
            navigate(home);
          }}
      >
        Return to home
      </button>
    </div>
  );
}

export default Results;
