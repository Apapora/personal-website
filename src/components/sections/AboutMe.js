import React, { useState } from "react";
import Badge from "../elements/Badge";
import Resume from "../../resume.json";
import App from "../elements/Particle";
import axios from "axios";

function AboutMe() {
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState(false); // state to track message received

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
    setErrorMessage(""); // Clear any previous error messages when typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.length < 5 || message.length > 50) {
      setErrorMessage("Text must be between 5 and 50 characters long.");
      return;
    }

    try {
      const response = await axios.post('https://xbfhv22kvj.execute-api.us-east-1.amazonaws.com/dev/message', { message });
      console.log(response.data);
      setMessageReceived(true); // Update state to indicate message received
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };


  return (
    <section className="section has-background-info" id="aboutMe">
      <div className="container has-text-centered">
      <App />

        <figure className="image container is-180x180">
          <img
            width="180px"
            height="180px"
            src={Resume.basics.picture}
            alt={Resume.basics.name}
            className="is-rounded"
            onError={(e)=>{e.target.onerror = null; e.target.src=Resume.basics.x_pictureFallback}}
          />
        </figure>
        <p className="subtitle is-4 has-text-white has-text-weight-bold">
          {Resume.basics.x_title}
        </p>
        <div className="subtitle is-5 has-text-white has-text-weight-light summary-text" dangerouslySetInnerHTML={{__html: Resume.basics.summary}}>
        </div>
        {messageReceived ? ( // Conditional rendering based on messageReceived state
          <p className="subtitle is-4 has-text-white has-text-weight-bold">
            Message received!
          </p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label has-text-white">Enter your message:</label>
              <div className="control">
                <textarea
                  className="textarea"
                  value={message}
                  onChange={handleMessageChange}
                  placeholder="Type your message here..."
                  rows="4"
                ></textarea>
              </div>
              {errorMessage && <p className="help is-danger">{errorMessage}</p>}
            </div>
            <div className="field">
              <div className="control">
                <button type="submit" className="button is-info">
                  Submit
                </button>
              </div>
            </div>
          </form>
        )}
        <div className="container interests">
          <div className="field is-grouped is-grouped-multiline has-text-centered">
            {Resume.interests.map((value, index) => {
              return (
                <Badge key={index} text={value.name} faIcon={value.x_icon} />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
w