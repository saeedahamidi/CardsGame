
import { useState } from 'react';
import './Cards.css';
import backImage1 from './images/image1.JPG';
import backImage2 from './images/image6.JPG';
import backImage3 from './images/image5.JPG';
import backImage4 from './images/image4.JPG';

function MainCard() {
  return (
    <div style={{ padding: '50px' }}>
      <Cards />
    </div>
  );
}

function Cards() {
  const cardData = [
    { front: '1', back: backImage1 },
    { front: '2', back: backImage2 },
    { front: '3', back: 'Empty' },
    { front: '4', back: 'Empty' },
    { front: '5', back:  'Empty'},
    { front: '6', back:'Empty' },
    { front: '7', back:  backImage3 },
    { front: '8', back: backImage4 },
  ];

  const [Cards, setCards] = useState(Array(8).fill(false));
  const [Count, setCount] = useState(0);
  const [foundImages, setFoundImages] = useState([]);
  const [showCongrats, setShowCongrats] = useState(false);
  const[warning,setWarning]=useState("");
  //const[failed,setFailed]=useState('');

  function handleClick(index) {
    if (Count >= 4 ) return;
    setCount(prev => prev + 1);
    
    const newCards = [...Cards];
    newCards[index] = true;
    setCards(newCards);

   

    if (cardData[index].back !== 'Empty') {
        const newFound = [...foundImages, index];
              setFoundImages(newFound);
     // const newFound= setFoundImages([...foundImages, index]);
     if (warning === "") {
        setWarning(true)
     }
      
      const imageIndexes = cardData
        .map((card, i) => (card.back !== 'Empty' ? i : null))
      
        .filter(i => i !== null);
       
      const allFound = imageIndexes.every(i => newFound.includes(i));
      if (allFound) {
        setShowCongrats(true);
      }
    }
  }

  return (
    <div className='borderStyle'>
         <h1 style={{color:'#BF8CE1', textAlign:'center'}} >Click On Card in order to win the Prize</h1>
      <div className="card-container">
        {cardData.map((card, index) => (
          <div
            key={index}
            className={`card ${Cards[index] ? 'flipped' : ''}`}
            onClick={() => handleClick(index)}
          >
            <div className="card-face card-front">{card.front}</div>
            <div
              className="card-face card-back"
              style={
                card.back === 'Empty'
                  ? []
                  : {
                      backgroundImage: `url(${card.back})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center', }}>
              {card.back === 'Empty' ? 'Empty' : ''}
            </div>
          </div>
        ))}
      </div>
     {window.alert(warning && '⛔ You are allow just four times to click on card and finde four images')}
      <div style={{ marginTop: '20px', paddingBottom:'20px', fontSize: '24px', textAlign: 'center' }}>
        {showCongrats && 'Congratulations! you found four images 🎉You win the prize🎆🏆'}
      </div>
    </div>
  );
}

export default MainCard;