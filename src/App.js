import "./App.css";
import { useState } from "react";
// import { Configuration, OpenAIApi } from "openai";
// import { OPENAI_API_KEY } from "./api";

function App() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageURL] = useState("");
  const [loading, setLoading] = useState(false);

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
    try {
      // setLoading(true);
      // const response = await openai.createImage({
      //   prompt: prompt,
      //   n: 1,
      //   size: "1024x1024",
      // });
      const response = await generateMockImage(); // Mock response
      console.log(response);

      setImageURL(response.data.data[0].url);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <div className="header">
        <h3 className="title">
          <i className="fa fa-image"></i> Generate an image with OpenAI
        </h3>
      </div>

      <form
        className="app-form"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          className="app-input"
          placeholder="Type something..."
          onChange={(e) => setPrompt(e.target.value)}
          required
        ></input>
        <button type="button" className="app-button" onClick={generateImage}>
          Generate
        </button>
      </form>
      <div className="result-container">
        {loading ? (
          <div className="loading-message">
            We're creating your image now. Sit Tight!
          </div>
          
        ) : (
          <div className="result-image-container">
            {imageUrl.length > 0 ? (
              <img className="result-image" src={imageUrl} alt={prompt}></img>
            ) : (
              <></>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
