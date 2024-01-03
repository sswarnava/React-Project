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
        console.log(combinedList);

        // Shuffle the list
        combinedList.sort(() => Math.random());
        // Convert the shuffled list back to a string
        const shuffledResult = combinedList.join('');

        setText(shuffledResult)
        setRemaningLength(stringLength - minimumUpper - minimumLower - minimumNumber - minimumSpChar)

    }, [stringLength, minimumUpper, minimumLower, minimumSpChar, minimumNumber, upperCaseAllowed, lowerCaseAllowed, numberAllowed, specialCharAllowed, specialChar, setText])

    useEffect(() => stringGenerator(), [stringGenerator, stringLength, minimumUpper, minimumLower, minimumSpChar, minimumNumber, upperCaseAllowed, lowerCaseAllowed, numberAllowed, specialCharAllowed, specialChar, setText, remainingLength])


    // Handle Minimun string count  
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
        <div className='bg-gray-700 text-yellow-400' style={{ height: '40rem' }}>
            <div className="border-white border-2 mx-5 py-4 rounded-md relative top-5">
                <h1 className="text-center font-bold text-white text-2xl">Random Password Generator</h1>
                <div>
                    <input
                        type="text"
                        value={text}
                        className="w-full text-xs text-black border-r-4 px-1"
                    />
                    <br />
                    <input
                        type="range"
                        min={10} max={256} step={1}
                        onChange={(e) => { setStringLength(e.target.value) }}
                    />
                    <label htmlFor="length" className="ml-3 text-sm text-orange-500">String Length: ({stringLength})</label>

                    <br />
                    <input
                        type="checkbox"
                        id="upperCase"
                        defaultChecked={upperCaseAllowed}
                        onChange={() => { setUpperCaseAllowed((prev) => !prev),setMinimumUpper(() => (!upperCaseAllowed&& (remainingLength > 0)) ? 1 : 0) }}
                        className="ml-2"
                    />
                    <label htmlFor="chareater" className="ml-2">Upper Case</label>

                    <br />
                    <input
                        type="checkbox"
                        id="lowerCase"
                        defaultChecked={lowerCaseAllowed}
                        onChange={() => { setLowerCaseAllowed((prev) => !prev), setMinimumLower(() => (!lowerCaseAllowed && (remainingLength > 0)) ? 1 : 0) }}
                        className="ml-2"
                    />
                    <label htmlFor="chareater" className="ml-2">Lower Case</label>

                    <br />
                    <input
                        type="checkbox"
                        id="number"
                        disabled={(!upperCaseAllowed && !lowerCaseAllowed)}
                        onChange={() => { setNumberAllowed((prev) => !prev), setMinimumNumber(() => (!numberAllowed && (remainingLength > 0)) ? 1 : 0) }}
                        className="ml-2"
                    />
                    <label htmlFor="number" className="ml-2">Number</label>

                    <br />
                    <input
                        type="checkbox"
                        id="specialCharacter"
                        disabled={(!upperCaseAllowed && !lowerCaseAllowed)}
                        onChange={() => { setSpecialCharAllowed((prev) => !prev), setMinimumSpChar(() => (!specialCharAllowed && (remainingLength > 0)) ? 1 : 0) }}
                        className="ml-2"
                    />
                    <label htmlFor="character" className="ml-2">Special Character</label>
                    <input
                        type="text"
                        id="myInput"
                        name="myInput"
                        value={specialChar}
                        onChange={(event) => setSpecialChar(event.target.value)}
                        className="ml-2 w-80 pl-2 border-2 border-blue-300 rounded-md text-black text-sm"
                    />
                    <label htmlFor="" className="ml-2 text-xs text-green-500">(Editable special characters)</label>

                    <br />
                    <div className="text-white mt-3">
                        <label htmlFor="minimumUpperCase" className="ml-3 text-sm">Select Minimum Upper Case</label>
                        <input
                            type="number"
                            id="mouse-only-number-input"
                            onChange={handleUpperCaseChange}
                            min={1}
                            max={stringLength - minimumLower - minimumNumber - minimumSpChar}
                            value={minimumUpper}
                            disabled={!upperCaseAllowed}
                            style={{ width: 'auto' }}
                            className="ml-3 text-sm text-black h-6 p-2 rounded-md"
                        />
                        <label htmlFor="ramaningUpperCase" className="ml-3 text-sm">Remaining length: {remainingLength}</label>
                    </div>

                    <div className="text-white mt-3">
                        <label htmlFor="minimumLowerCase" className="ml-3 text-sm">Select Minimum Lower Case</label>
                        <input
                            type="number"
                            id="mouse-only-number-input"
                            onChange={handleLowerCaseChange}
                            min={1}
                            max={stringLength - minimumUpper - minimumNumber - minimumSpChar}
                            value={minimumLower}
                            style={{ width: 'auto' }}
                            disabled={!lowerCaseAllowed}
                            className="ml-3 text-sm text-black h-6 p-2 rounded-md"
                        />
                        <label htmlFor="ramaningLowerCase" className="ml-3 text-sm">Remaining length: {remainingLength}</label>

                    </div>

                    <div className="text-white mt-3">
                        <label htmlFor="minimumNumber" className="ml-3 text-sm">Select Minimun Number</label>
                        <input
                            type="number"
                            id="mouse-only-number-input"
                            onChange={handleNumberChange}
                            min={0}
                            max={stringLength - minimumUpper - minimumLower - minimumSpChar}
                            value={minimumNumber}
                            style={{ width: 'auto' }}
                            disabled={!numberAllowed}
                            className="ml-3 text-sm text-black h-6 p-2 rounded-md"
                        />
                        <label htmlFor="ramaningNumbe" className="ml-3 text-sm">Remaining length: {remainingLength}</label>
                    </div>

                    <div className="text-white mt-3">
                        <label htmlFor="minimumSpChar" className="ml-3 text-sm">Select Minimun Special Char</label>
                        <input
                            type="number"
                            id="mouse-only-number-input"
                            onChange={handleSpCharChange}
                            min={0}
                            max={stringLength - minimumUpper - minimumLower - minimumNumber}
                            value={minimumSpChar}
                            style={{ width: 'auto' }}
                            disabled={!specialCharAllowed}
                            className="ml-3 text-sm text-black h-6 p-2 rounded-md"
                        />
                        <label htmlFor="ramaningLowerCase" className="ml-3 text-sm">Remaining length: {remainingLength}</label>
                    </div>
                </div>
            </div>
        </div >
    )
}