import { React, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { createSpeechlySpeechRecognition } from "@speechly/speech-recognition-polyfill";
import { useLocation, useNavigate } from "react-router-dom";

// const appId = process.env.REACT_APP_SECRET;
const appId = "7fd27f79-99ff-4484-879a-5b776ba182d1";
const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(appId);
SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);
const results = "/results";
const responses = [];
let waiting = true;

function Practice() {
  const location = useLocation();
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  let finished = false;
  const data = location.state["data"]["message"];
  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
    resetTranscript,
  } = useSpeechRecognition({ continuous: false });

  if (!browserSupportsSpeechRecognition) {
    return <span> Browser does not support speech to text.</span>;
  }

  if (!isMicrophoneAvailable) {
    return <span> Please allow access to microphone.</span>;
  }

  function startInterview() {
    waiting = false;
    SpeechRecognition.startListening({ continuous: true });
  }

  function nextQuestion() {
    setIndex(index + 1);
    responses.push(transcript);
    console.log(responses);
    if (index === data.length - 1) {
      finished = true;
    }
    if (finished) {
      SpeechRecognition.stopListening();
      waiting = true;
      navigate(results, {state: {data, responses}});
    }
    resetTranscript();
  }

  return (
    // <div>
    //   <p>Microphone: {listening ? "on" : "off"}</p>
    //   <button
    //     onClick={() => SpeechRecognition.startListening({ continuous: true })}
    //   >
    //     Start
    //   </button>
    //   <button onClick={SpeechRecognition.stopListening}>Stop</button>
    //   <button onClick={resetTranscript}>Reset</button>
    //   <p>{transcript}</p>
    // </div>
    <div>
      {waiting ? 
        <div className="flex min-h-screen flex-col items-center justify-center font-serif gap-4 font-semibold">
          <button
            className="border-2 border-black rounded-full shadow hover:shadow-md hover:opacity-50 p-4 transition duration-500"
            onClick={startInterview}
          >
            Click here to start the practice interview
          </button>
          <p>Good luck!</p>
        </div> : 
        <div className="text-center flex flex-col items-center gap-10 font-serif text-bold font-semibold">
          <h1 className="pt-10 text-3xl">{data[index]}</h1>
          <p className="text-x w-2/3">{transcript}</p>
          <button
            className="border-2 border-black rounded-full shadow hover:shadow-md hover:opacity-50 p-4 transition duration-500"
            onClick={nextQuestion}
          >
            Click when you have finished your answer
          </button>
        </div>}
    </div>
  );
}
export default Practice;
