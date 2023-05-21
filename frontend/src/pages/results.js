import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react"

function Results() {
  const location = useLocation();
  const [question, setQuestion] = useState(0);
  const [answer, setAnswer] = useState(0);
  const questions = location.state.data;
  const answers = location.state.responses;
  let currentQuestion = questions[question];
  let currentAnswer = answers[answer];
  return (
    <div className="flex min-h-screen flex-col items-center font-serif gap-2">
      <h1 className="text-3xl pt-5">Great work!</h1>
      <h1 className="text-xl">
        Here's a recap of your answers to the following questions!
      </h1>
      <div className="pt-10 border-solid border-2 border-black flex flex-col items-center">
        {currentQuestion}
        <br/>
        {currentAnswer}
      </div>
    </div>
  );
}

export default Results;
