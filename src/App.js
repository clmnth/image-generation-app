import "./App.css";
import { useState } from "react";
// import { Configuration, OpenAIApi } from "openai";
// import { OPENAI_API_KEY } from "./api";

function App() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");

  // const configuration = new Configuration({
  //   apiKey: OPENAI_API_KEY,
  // });

  // const openai = new OpenAIApi(configuration);

  // Mock response
  const generateMockImage = async () => {
    return {
      data: {
        data: [
          {
            url: "https://openaicom.imgix.net/65f7e2f3-cbd1-43c9-b2c5-7d8a3ebb9e3c/Anastronautridingahorseinaphotorealisticstyle0.jpg?fm=auto&auto=compress,format&fit=min&rect=0,0,1024,1024&w=3840&h=3840",
          },
        ],
      },
    };
  };

  const generateImage = async () => {
    // const response = await openai.createImage({
    //   prompt: prompt,
    //   n: 1,
    //   size: "524x524",
    // });
    const response = await generateMockImage(); // Mock response
    console.log(response);

    setResult(response.data.data[0].url);
  };

  return (
    <div className="App">
      <h3 className="title">
        <i className="fa fa-image"></i> Generate an image with OpenAI
      </h3>
      <form
        className="app-form"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <textarea
          className="app-input"
          placeholder="Type something..."
          onChange={(e) => setPrompt(e.target.value)}
          required
        ></textarea>
        <button type="button" className="app-button" onClick={generateImage}>
          Generate an image
        </button>
      </form>
      {result.length > 0 ? (
        <img className="result-image" src={result} alt="result"></img>
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
