import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import termsData from './terms';
import { Container, Row, Col, Button, Stack, Card, Image } from 'react-bootstrap';




const terms = termsData;

const App: React.FC = () => {
  const [selectedTerms, setSelectedTerms] = useState(terms);
  const [meaning, setMeaning] = useState<string>('');
  const [isMatch, setIsMatch] = useState(false);
  const [seconds, setSeconds] = useState(10);
  const [firstClick, setFirstClick] = useState(false); 
  const [counter, setCounter] = useState(0)

  const matchWordToMeaning = (index: number) => {    
    if (selectedTerms[index].meaning === meaning) {
      setIsMatch(true);      
      randomMeaning();
      setFirstClick(true);
      setCounter(counter + 1)
      if (counter === 15) {              
        window.alert('Youve won!! Play again!');
        setCounter(0)        
      }
    } else {
      setIsMatch(false);
      setFirstClick(true);
    }
  };

  const resetGrid = () => {
    const shuffledTerms = [...terms];
    shuffledTerms.sort(() => Math.random() - 0.5);
    setSelectedTerms(shuffledTerms);
    setCounter(0)
  };

  const randomMeaning = () => {    
    const idx = Math.floor(Math.random() * terms.length);
    const newMeaning = terms[idx].meaning;
    setMeaning(newMeaning);
    setSeconds(10);    
  };
  
  useEffect(() => {
    randomMeaning();       
  }, [])
  

  useEffect(() => {       
    const timerId = setInterval(() => {     
        if (seconds === 0) {
          setSeconds(10)
          resetGrid();         
        } else {
          setSeconds((seconds) => seconds - 1); 
        }            
    }, 1000);
    return () => clearInterval(timerId);
  }, [seconds]); 


const congrats = () => {  
  if (firstClick && isMatch) {   
    return <h3>Fantastic! KeepGoing!</h3>
  } else if (firstClick && !isMatch) {
    return <h3>Oops, try again</h3>
  } else {
    return null
  }
}


  return (
    <>    
      <Image src='/images/memeLord.jpg' roundedCircle/> 
    
    <Container className='gameTitle'>
      <h1>The Fancy Words Game</h1>
    </Container>         
    <Container className='mt-5 '>        
      <Row className='firstRow'>
        <Col >
          <Stack gap={3} className='text-center'>
          <div className="timeLeft p-1"><h3>{`Complete 16 points by matching the meaning to one of the fancy words in the grid. You have ${seconds} seconds before you lose your points and the words change order.`}</h3></div>
          <div className="counter p-1"><h1>{counter}</h1></div>
          <div className='meaningCard'>
            <Card className="meaning">
            <Card.Body><h2>{meaning}</h2></Card.Body>
          </Card>
          </div>                                 
          </Stack> 
          <Button variant="light" className='anotherButton' onClick={randomMeaning}>Try another definition</Button>      
        </Col>
        </Row>
        <Row>
        <Col className='secondRow'>
        <div className="congrats">
            <div >{congrats()}</div>
        </div>
        <div className="BoxGrid" >
          {selectedTerms.map((term, index) => (
            <div
              key={index}
              className='BoxItem'            
              onClick={() => matchWordToMeaning(index)}
            >
              {term.word}
            </div>
          ))}
        </div>         
        </Col>     
        </Row>
    </Container>
    </>
  );
};

export default App;
