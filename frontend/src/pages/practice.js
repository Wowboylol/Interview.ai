import React from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { createSpeechlySpeechRecognition } from "@speechly/speech-recognition-polyfill";

// const appId = process.env.REACT_APP_SECRET;
const appId = "7fd27f79-99ff-4484-879a-5b776ba182d1";
const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(appId);
SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);
let waiting = true;

function Practice() {
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
    SpeechRecognition.startListening({ continuous: true });
    waiting = false;
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
    <div className="flex min-h-screen flex-col items-center justify-center font-serif gap-8">
      {waiting ? (
        <button
          className="border-2 border-black rounded-full shadow hover:shadow-md hover:opacity-50 p-4 transition duration-500"
          onClick={startInterview}
        >
          Click here to start the practice interview
        </button>
      ) : (
        <p>
          {transcript}
        </p>
      )}
    </div>
  );
}
export default Practice;
