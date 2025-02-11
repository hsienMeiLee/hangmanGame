import { useCallback, useEffect, useState } from 'react';
import words from './Wordlist.json'
import HangmanDrawing from './HangmanDrawing';
import HangmanWord from './HangmanWord';
import Keyboard from './Keyboard';

function getWord(){
  return words[Math.floor(Math.random()*words.length)]
}

const App = () => {
  const [wordToGuess, setWordToGuess] = useState(getWord)
  const [guessLetters, setGuessLetters] = useState<string[]>([]);
  const incorrectLetters = guessLetters.filter(letter => !wordToGuess.includes(letter));

  const isLoser = incorrectLetters.length >= 6;
  const isWinner = wordToGuess.split("").every(letter => guessLetters.includes(letter))

  const addGuessedLetter = useCallback((letter:string) => {
    if(guessLetters.includes(letter) || isLoser || isWinner) return
    setGuessLetters(currentLetters => [...currentLetters,letter])
  },[guessLetters, isWinner, isLoser])

  useEffect(()=>{
    const handler = (e:KeyboardEvent)=>{
      const key = e.key
      if(!key.match(/^[a-z]$/)) return
      e.preventDefault();
      addGuessedLetter(key);
    }
    document.addEventListener("keypress", handler)
    return() => {
      document.removeEventListener("keypress", handler)
    }
  },[guessLetters])

  useEffect(()=>{
    const handler = (e:KeyboardEvent)=>{
      const key = e.key
      if(key !== "Enter") return;
      e.preventDefault();
      setGuessLetters([]);
      setWordToGuess(getWord())
    }
    document.addEventListener("keypress", handler)
    return() => {
      document.removeEventListener("keypress", handler)
    }
  },[])

  return (
    <div style={{
      maxWidth : "800px",
      display : "flex",
      flexDirection : "column",
      gap : "2rem",
      margin : "0 auto",
      alignItems : "center"
    }}>
      <div style={{ fontSize : "2rem", textAlign : "center"}}>
        {isWinner && "Winner - refresh to play again"}
        {isLoser && "Try again"}
      </div>

      <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
      <HangmanWord reveal={isLoser} guessedLetters = {guessLetters} wordToGuess = {wordToGuess} />
      <div style={{
        alignSelf : "stretch"
      }}>
        <Keyboard 
        disabled = {isWinner || isLoser}
        activeLetter = {guessLetters.filter(letter => wordToGuess.includes(letter))}
        inactiveLetters = {incorrectLetters}
        addGuessedLetters = {addGuessedLetter} />
      </div>
      

    </div>
  )
}

export default App