import React, {useState, useEffect} from "react";


const Timer = () => {  
  const [seconds, setSeconds] = useState(10)
  useEffect(() => {
    if (seconds === 0) {
      setSeconds(10)
    } else {
      seconds > 0 && setTimeout(() => setSeconds(seconds - 1), 1000);
    }
    
  }, [seconds]);
   

  return ( 
    <h2>{`You have ${seconds} seconds left before the order of the words changes`}</h2>
  )
}

export default Timer