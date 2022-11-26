import '../styles/App.scss';
import { useEffect, useState } from 'react';
import callToApi from '../services/api';

function App() {
  //states
  const [numberOfErrors, setNumberOfErrors] = useState(0);
  const [lastLetter, setLastLetter] = useState('');
  const [message, setMessage] = useState('');
  const [word, setWord] = useState('');
  const [userLetters, setUserLetters] = useState([]);
  console.log(word);

  //Effects
  useEffect(() => {
    setNumberOfErrors(renderDummy());
  }, [userLetters]);

  useEffect(() => {
    callToApi()
      .then((data) => {
        setWord(data.word);
      })
      .catch((error) => console.log(`Ha sucedido un error: ${error}`));
  }, []);

  //Handlers
  const handleLastLetter = (event) => {
    const regex = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü]{0,1}/;
    if (regex.test(event.target.value)) {
      setLastLetter(event.target.value.toLowerCase());
      setUserLetters([...userLetters, event.target.value.toLowerCase()]);
    } else {
      console.log('Escribe una letra que esté permitida, por favor');
    }
  };

  const increment = () => {
    setNumberOfErrors(numberOfErrors + 1);
  };

  //Render Helpers
  const renderSolutionLetter = () => {
    const wordLetters = word.split('');
    return wordLetters.map((eachLetter, i) => {
      if (userLetters.includes(eachLetter.toLowerCase())) {
        return (
          <li key={i} className='letter'>
            {eachLetter}
          </li>
        );
      } else {
        return <li key={i} className='letter'></li>;
      }
    });
  };

  // const renderErrorLetters = () => {
  //   return userLetters.map((eachLetter, i) => {
  //     if (!word.includes(eachLetter.toLowerCase())) {
  //       return (
  //         <li key={i} className='letter'>
  //           {eachLetter}
  //         </li>
  //       );
  //     }
  //   });
  // };

  const renderErrorLetters = () => {
    return userLetters
      .filter((eachLetter) => !word.includes(eachLetter.toLowerCase()))
      .map((eachLetter, i) => {
        return (
          <li key={i} className='letter'>
            {eachLetter}
          </li>
        );
      });
  };

  const renderDummy = () => {
    let errorCounter = 0;
    const wrongLetters = userLetters.filter(
      (eachLetter) => !word.includes(eachLetter.toLowerCase())
    );
    wrongLetters.forEach((eachLetter) => {
      errorCounter++;
    });
    return errorCounter;
  };

  //Return
  return (
    <div className='page'>
      <header>
        <h1 className='header__title'>Juego del ahorcado</h1>
        <button type='text' onClick={increment}>
          Incrementar
        </button>
        <p>{message}</p>
      </header>
      <main className='main'>
        <section>
          <div className='solution'>
            <h2 className='title'>Solución:</h2>
            <ul className='letters'>{renderSolutionLetter()}</ul>
          </div>
          <div className='error'>
            <h2 className='title'>Letras falladas:</h2>
            <ul className='letters'>{renderErrorLetters()}</ul>
          </div>
          <form className='form'>
            <label className='title' htmlFor='last-letter'>
              Escribe una letra:
            </label>
            <input
              autoComplete='off'
              className='form__input'
              maxLength='1'
              type='text'
              name='last-letter'
              id='last-letter'
              value={lastLetter}
              onChange={handleLastLetter}
            />
          </form>
        </section>
        <section className={`dummy error-${numberOfErrors}`}>
          <span className='error-13 eye'></span>
          <span className='error-12 eye'></span>
          <span className='error-11 line'></span>
          <span className='error-10 line'></span>
          <span className='error-9 line'></span>
          <span className='error-8 line'></span>
          <span className='error-7 line'></span>
          <span className='error-6 head'></span>
          <span className='error-5 line'></span>
          <span className='error-4 line'></span>
          <span className='error-3 line'></span>
          <span className='error-2 line'></span>
          <span className='error-1 line'></span>
        </section>
      </main>
    </div>
  );
}

export default App;
