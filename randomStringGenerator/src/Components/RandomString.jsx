import { useEffect, useState } from "react"
import { useCallback } from "react"

export default function RandomString() {
    const [stringLength, setStringLength] = useState(10)
    const [upperCaseAllowed, setUpperCaseAllowed] = useState(true)
    const [lowerCaseAllowed, setLowerCaseAllowed] = useState(true)
    const [numberAllowed, setNumberAllowed] = useState(false)
    const [specialCharAllowed, setSpecialCharAllowed] = useState(false)
    const [specialChar, setSpecialChar] = useState(`!@#$%^&*()_+-=~!@#$%^&*{}|"[];':|<>?,./`)
    const [text, setText] = useState("")

    const [minimumUpper, setMinimumUpper] = useState(1)
    const [minimumLower, setMinimumLower] = useState(1)
    const [minimumNumber, setMinimumNumber] = useState(0)
    const [minimumSpChar, setMinimumSpChar] = useState(0)

    const [remainingLength, setRemaningLength] = useState(stringLength)

    const stringGenerator = useCallback(() => {
        let generetedString = ''
        let generetedMinimumString = ''
        let fullString = ''
        if (upperCaseAllowed) fullString += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        if (lowerCaseAllowed) fullString += 'abcdefghijklmnopqrstuvwxyz'
        if (numberAllowed) fullString += '0123456789'
        if (specialCharAllowed) fullString += specialChar

        // Minimum String Generate
        for (let i = 1; i <= minimumUpper; i++) if (upperCaseAllowed) generetedMinimumString += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.charAt(Math.floor(Math.random() * 26));
        for (let i = 1; i <= minimumLower; i++) if (lowerCaseAllowed) generetedMinimumString += 'abcdefghijklmnopqrstuvwxyz'.charAt(Math.floor(Math.random() * 26));
        for (let i = 1; i <= minimumNumber; i++) if (numberAllowed) generetedMinimumString += '0123456789'.charAt(Math.floor(Math.random() * 10));
        for (let i = 1; i <= minimumSpChar; i++) if (specialCharAllowed) generetedMinimumString += specialChar.charAt(Math.floor(Math.random() * specialChar.length));

        // After minimum string generate, rest of the string generate
        let TotalStringNeeded = stringLength - (minimumUpper + minimumLower + minimumSpChar + minimumNumber)

        for (let i = 1; i <= TotalStringNeeded; i++) {
            let randomCharIndex = Math.floor(Math.random() * fullString.length)
            generetedString += fullString.charAt(randomCharIndex)
        }

        const combinedString = generetedString + generetedMinimumString
        // Convert the string to a list of characters
        const combinedList = combinedString.split('');
        // Shuffle the list
        combinedList.sort(() => Math.random() - 0.5);
        // Convert the shuffled list back to a string
        const shuffledResult = combinedList.join('');

        setText(shuffledResult)
        setRemaningLength(stringLength - minimumUpper - minimumLower - minimumNumber - minimumSpChar)
    }, [stringLength, minimumUpper, minimumLower, minimumSpChar, minimumNumber, upperCaseAllowed, lowerCaseAllowed, numberAllowed, specialCharAllowed, specialChar, setText, remainingLength])

    useEffect(() => stringGenerator(), [stringGenerator, stringLength, minimumUpper, minimumLower, minimumSpChar, minimumNumber, upperCaseAllowed, lowerCaseAllowed, numberAllowed, specialCharAllowed, specialChar, setText, remainingLength])

    const handleUpperCaseChange = (e) => {
        const newValue = parseInt(e.target.value, 10);
        if (newValue <= stringLength) setMinimumUpper(newValue)
    };

    const handleLowerCaseChange = (e) => {
        const newValue = parseInt(e.target.value, 10);
        if (newValue <= stringLength) setMinimumLower(newValue)
        // setMinimumLower(remainingLength > newValue ? newValue : " ");
    };

    const handleNumberChange = (e) => {
        const newValue = parseInt(e.target.value, 10);
        if (newValue <= stringLength) setMinimumNumber(newValue)
        // setMinimumNumber(remainingLength > newValue ? newValue : " ");
    };

    const handleSpCharChange = (e) => {
        const newValue = parseInt(e.target.value, 10);
        if (newValue <= stringLength) setMinimumSpChar(newValue)
        // setMinimumSpChar(remainingLength > newValue ? newValue : "");
    };

    useEffect(() => {
        setMinimumUpper(1)
        setMinimumLower(1)
        setMinimumNumber(0)
        setMinimumSpChar(0)

    }, [stringLength])

    useEffect(() => {
        const mouseOnlyNumberInputField = document.getElementById("mouse-only-number-input");

        const handleKeyPress = (event) => event.preventDefault();
        mouseOnlyNumberInputField.addEventListener("keypress", handleKeyPress);

        // Cleanup the event listener when the component unmounts
        return () => mouseOnlyNumberInputField.removeEventListener("keypress", handleKeyPress);
    }, []);

    return (
        < div >
            <div style={{ height: '100vh', position: 'absolute', left: '3%', top: '10%' }}>
                <h1>Random String Generator</h1>
                <div>
                    <input
                        type="text"
                        value={text}
                        style={{ width: '70rem' }}
                    />
                    <br />
                    <input
                        type="range"
                        min='10' max='256'
                        onChange={(e) => { setStringLength(e.target.value) }}
                    />
                    <label htmlFor="length" >length ({stringLength})</label>

                    <br />
                    <input
                        type="checkbox"
                        id="upperCase"
                        defaultChecked={upperCaseAllowed}
                        onChange={() => { setUpperCaseAllowed((prev) => !prev) }}
                    />
                    <label htmlFor="chareater">Upper Case</label>

                    <br />
                    <input
                        type="checkbox"
                        id="lowerCase"
                        defaultChecked={lowerCaseAllowed}
                        onChange={() => { setLowerCaseAllowed((prev) => !prev) }}
                    />
                    <label htmlFor="chareater">Lower Case</label>

                    <br />
                    <input
                        type="checkbox"
                        id="number"
                        disabled={(!upperCaseAllowed && !lowerCaseAllowed)}
                        onChange={() => { setNumberAllowed((prev) => !prev), setMinimumNumber(() => (!numberAllowed && (remainingLength > 0)) ? 1 : 0) }} />
                    <label htmlFor="number">Number</label>

                    <br />
                    <input
                        type="checkbox"
                        id="specialCharacter"
                        disabled={(!upperCaseAllowed && !lowerCaseAllowed)}
                        onChange={() => { setSpecialCharAllowed((prev) => !prev), setMinimumSpChar(() => (!specialCharAllowed && (remainingLength > 0)) ? 1 : 0) }}
                    />
                    <label htmlFor="character">Special Character</label>
                    <input
                        type="text"
                        id="myInput"
                        name="myInput"
                        value={specialChar}
                        onChange={(event) => setSpecialChar(event.target.value)}
                        style={{ width: '15rem' }}
                    />

                    <br />
                    <div style={{ marginTop: '.4rem' }}>
                        <label htmlFor="minimumUpperCase">Select Minimum Upper Case</label>
                        <input
                            type="number"
                            id="mouse-only-number-input"
                            onChange={handleUpperCaseChange}
                            min={1}
                            max={stringLength - minimumLower - minimumNumber - minimumSpChar}
                            value={minimumUpper}
                            disabled={!upperCaseAllowed}
                            style={{ width: 'auto' }}
                        />
                        <label htmlFor="ramaningUpperCase">Remaining length: {remainingLength}</label>
                    </div>

                    <div style={{ marginTop: '.4rem' }}>
                        <label htmlFor="minimumLowerCase">Select Minimum Lower Case</label>
                        <input
                            type="number"
                            id="mouse-only-number-input"
                            onChange={handleLowerCaseChange}
                            min={1}
                            max={stringLength - minimumUpper - minimumNumber - minimumSpChar}
                            value={minimumLower}
                            style={{ width: 'auto' }}
                            disabled={!lowerCaseAllowed}
                        />
                        <label htmlFor="ramaningLowerCase">Remaining length: {remainingLength}</label>

                    </div>

                    <div style={{ marginTop: '.4rem' }}>
                        <label htmlFor="minimumNumber">Select Minimun Number</label>
                        <input
                            type="number"
                            id="mouse-only-number-input"
                            onChange={handleNumberChange}
                            min={0}
                            max={stringLength - minimumUpper - minimumLower - minimumSpChar}
                            value={minimumNumber}
                            style={{ width: 'auto' }}
                            disabled={!numberAllowed}
                        />
                        <label htmlFor="ramaningNumbe">Remaining length: {remainingLength}</label>
                    </div>

                    <div style={{ marginTop: '.4rem' }}>
                        <label htmlFor="minimumSpChar">Select Minimun Special Char</label>
                        <input
                            type="number"
                            id="mouse-only-number-input"
                            onChange={handleSpCharChange}
                            min={0}
                            max={stringLength - minimumUpper - minimumLower - minimumNumber}
                            value={minimumSpChar}
                            style={{ width: 'auto' }}
                            disabled={!specialCharAllowed}
                        />
                        <label htmlFor="ramaningLowerCase">Remaining length: {remainingLength}</label>
                    </div>
                </div>
            </div>
        </div >
    )
}