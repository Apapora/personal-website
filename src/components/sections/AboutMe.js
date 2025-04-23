import React, { useState } from "react";
//import Badge from "../elements/Badge";
import Resume from "../../resume.json";
//import App from "../elements/TSParticles";
import axios from "axios";

function AboutMe() {
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState(false); // state to track message received
  const [tooManyRequests, setTooManyRequests] = useState(false);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
    setErrorMessage(""); // Clear any previous error messages when typing
    setTooManyRequests(false); // Reset tooManyRequests state
    setMessageReceived(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.length < 5 || message.length > 50) {
      setErrorMessage("Text must be between 5 and 50 characters long.");
      return;
    }

    try {
      const tak = "hFxcdJeMKi1K5a8FGXY5t2r2U1o6yTD01sUdEH2w"
      const response = await axios.post('https://xbfhv22kvj.execute-api.us-east-1.amazonaws.com/dev/message', { message }, 
      { headers: {
        'x-api-key':`${tak}`,
        }
      });
      console.log(response.data);
      setMessageReceived(true); // Update state to indicate message received
    } catch (error) {
      console.error(error);
      // Handle error
      if (error.response && error.response.status === 429) {
        // Handle 429 error (Too Many Requests)
        setTooManyRequests(true)
        //setErrorMessage("My answering machine is currently full. Please try again tomorrow");
      } else {
        // Handle other errors
        setErrorMessage("An error occurred while processing your request.");
      }
    }
  };


  return (
    <section className="section has-background-info-35" id="aboutMe">
      <div className="container has-text-centered">
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
        <div className="subtitle is-5 has-text-white has-text-weight-light" dangerouslySetInnerHTML={{__html: Resume.basics.summary}}>
        </div>
        {/*
        <div className="container interests">
          <div className="field is-grouped is-grouped-multiline has-text-centered">
            {Resume.interests.map((value, index) => {
              return (
                <Badge key={index} text={value.name} faIcon={value.x_icon} />
              );
            })}
          </div>
        </div>
          */}
      </div>
    </section>
  );
}

export default AboutMe;
