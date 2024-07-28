import React from "react";
import { Link } from "react-router-dom";
import Lottie from 'react-lottie'
import animationData from './chat.json';


const Chat = () => {
  const defaultOptions = {
    loop: false,
    autoplay: false,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }

  };
  return (
    <Link to="/chat">
      <div className="chat">
        <Lottie
          options={defaultOptions}
          height={200}
          width={200}
        />
      </div>
    </Link>


  );
};

export default Chat;


