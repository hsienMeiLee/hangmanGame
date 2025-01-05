import styles from './Keyboard.module.css';

const KEYS = [
    "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"
];

type KeyboardProps= {
    activeLetter : string[];
    inactiveLetters : string[];
    addGuessedLetters : (letter:string) => void;
    disabled : boolean;
}


const Keyboard = ({activeLetter, inactiveLetters, addGuessedLetters, disabled} : KeyboardProps) => {
  return (
    <div style={{
        display : "grid",
        gridTemplateColumns : "repeat(auto-fit, minmax(75px, 1fr))",
        gap : ".5rem"
    }}>
        {KEYS.map((key)=>{
            const isActive = activeLetter.includes(key);
            const isInactive = inactiveLetters.includes(key);
            return(
                <button 
                onClick={()=>addGuessedLetters(key)} 
                className={`${styles.btn} ${isActive ? styles.active : ""} ${isInactive ? styles.inactive : ""}`} 
                key={key}
                disabled = {isInactive || isActive || disabled}>{key}</button>
            )
        })}
    </div>
  )
}

export default Keyboard