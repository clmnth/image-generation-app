import "./App.css";
import { useState, useEffect } from "react";
import { Configuration, OpenAIApi } from "openai";
import { OPENAI_API_KEY } from "./api";

function App() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); 
  const [lastPrompt, setLastPrompt] = useState("");

  const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  // Mock response

  // const generateMockImage = async () => {
  //   return {
  //     data: {
  //       data: [
  //         {
  //           url: "https://openaicom.imgix.net/65f7e2f3-cbd1-43c9-b2c5-7d8a3ebb9e3c/Anastronautridingahorseinaphotorealisticstyle0.jpg?fm=auto&auto=compress,format&fit=min&rect=0,0,1024,1024&w=3840&h=3840",
  //         },
  //       ],
  //     },
  //   };
  // };

  const generateImage = async () => {
    if (!prompt) {
      return;
    }
    setLoading(true); 
    setError("");

    try {
      const response = await openai.createImage({
        prompt: prompt,
        n: 1,
        size: "1024x1024",
      });
      // const response = await generateMockImage(); // Mock response
      console.log(response);

      setImageURL(response.data.data[0].url);
      setLastPrompt(prompt); // v2
      setPrompt(""); // v2
      document.querySelector(".app-input").value = "";
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
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
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault(); // Prevents the form from submitting
              generateImage();
            }
          }}
        ></input>
        <button type="button" className="app-button" onClick={generateImage}>
          Generate
        </button>
      </form>

      <div className="result-container">
        {loading ? (
          <div className="loading-container">
            <div className="loading-content">
              <div className="loading-icon">
                <i className="fa fa-spinner"></i>
              </div>
              <h3 className="loading-copy">We're creating your image now...</h3>
            </div>
          </div>
        ) : (
          <>
            {error ? (
              <div className="error-container">
                <div className="error-content">
                  <div className="error-icon">
                    <i className="fa fa-exclamation"></i>
                  </div>
                  <div className="error-message">{error}</div>
                </div>
              </div>
            ) : (
              <>
                {imageUrl.length > 0 ? (
                  <div className="result-container">
                  <div className="result-content">
                    <div className="result-copy">
                      <p>Your result for: {lastPrompt}</p>
                    </div>
                    <div className="result-img">
                      <img
                        className="result-image"
                        src={imageUrl}
                        alt={prompt}
                      ></img>
                    </div>
                  </div>
                  </div>
                ) : (
                  <></>
                )}
              </>
            )}
          </>
        )}
      </div>
      <div>
      <footer>
  <div className="text-footer">
    <i className="fa fa-code"></i> Coded by{" "}
    <u>
      <a className="footer-link" href="https://github.com/clmnth" target="_blank">
        clmnt
      </a>
    </u>{" "}
    - Powered by{" "}
    <u>
      <a className="footer-link" href="https://openai.com/" target="_blank">
        OpenAI
      </a>
    </u>
  </div>
</footer>
      </div>
    </div>
  );
}

export default App;
