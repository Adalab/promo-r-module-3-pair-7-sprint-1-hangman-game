word = 'hijo';
userLetters = ['i', 'j', 'k', 'l'];

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

console.log(renderDummy());
