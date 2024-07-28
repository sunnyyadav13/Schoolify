import React from "react"
import { Link } from "react-router-dom";
import Lottie from 'react-lottie'
import animationData from './todo.json';

const Notes = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }

  };

  return (

    <Link to="/taskManager">
      <div className="notes">
        <Lottie
          options={defaultOptions}
          height={200}
          width={200}
        />
      </div>
    </Link>


  );
};

export default Notes;

