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
        window.alert("You've won!! Play again!");
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
    return <h3>Fantastic! Keep Going!</h3>
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
      <Row >
        <Col className='firstCol' xs={12} lg={6}>
          <Stack gap={3} className='text-center'>
          <Container className="timeLeft"><h3>{`Complete 16 points by matching the meaning to one of the fancy words in the grid. You have ${seconds} seconds before you lose your points and the words change order.`}</h3></Container>
          <Container className="counter p-1"><h1>{counter}</h1></Container>
          <Container className='meaningCard'>
            <Card className="meaning">
            <Card.Body><h2>{meaning}</h2></Card.Body>
          </Card>
          </Container>                                 
          </Stack> 
          <Button variant="light" className='anotherButton' onClick={randomMeaning}>Try another definition</Button>      
        </Col>        
        <Col className='secondCol' xs={12}  lg={6}>
        <Container className="congrats">
            <Container >{congrats()}</Container>
        </Container>
        <Container className="BoxGrid">
          {selectedTerms.map((term, index) => (
            <Container
              key={index}
              className='BoxItem'            
              onClick={() => matchWordToMeaning(index)}
            >
              {term.word}
            </Container>
          ))}
        </Container>         
        </Col>     
        </Row>        
    </Container>
    <footer className="footer">
      <Container className='footer'>
        <Row>
          <Col md={12}>
            <p>Check out the GitHub repository for this project: <a href="https://github.com/NataliaSGM/theFancyWordsGame">Github</a></p>
          </Col>
        </Row>
      </Container>
    </footer>
    </>
  );
};

export default App;
