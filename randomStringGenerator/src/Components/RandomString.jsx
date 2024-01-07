import { useEffect, useState, useCallback, useRef } from "react"

export default function RandomString() {
    const [stringLength, setStringLength] = useState(10)
    const [upperCaseAllowed, setUpperCaseAllowed] = useState(true)
    const [lowerCaseAllowed, setLowerCaseAllowed] = useState(true)
    const [numberAllowed, setNumberAllowed] = useState(false)
    const [specialCharAllowed, setSpecialCharAllowed] = useState(false)
    const [specialChar, setSpecialChar] = useState(`!@#$%^&*()_+-=~!@#$%^&*{}|"[];':|<>?,./`)
    const [randomText, setText] = useState("")

    const [minimumUpper, setMinimumUpper] = useState(1)
    const [minimumLower, setMinimumLower] = useState(1)
    const [minimumNumber, setMinimumNumber] = useState(0)
    const [minimumSpChar, setMinimumSpChar] = useState(0)

    const [remainingLength, setRemaningLength] = useState(stringLength)

    // for useRef Hook
    let copyTextRef = useRef(null)

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
        combinedList.sort(() => Math.random());
        // Convert the shuffled list back to a string
        const shuffledResult = combinedList.join('');

        setText(shuffledResult)
        setRemaningLength(stringLength - minimumUpper - minimumLower - minimumNumber - minimumSpChar)

    }, [stringLength, minimumUpper, minimumLower, minimumSpChar, minimumNumber, upperCaseAllowed, lowerCaseAllowed, numberAllowed, specialCharAllowed, specialChar, setText])

    useEffect(() => stringGenerator(), [stringGenerator, stringLength, minimumUpper, minimumLower, minimumSpChar, minimumNumber, upperCaseAllowed, lowerCaseAllowed, numberAllowed, specialCharAllowed, specialChar, setText, remainingLength])


    // Handle Minimun string count  
    const handleUpperCaseChange = () => {
        let stringCount = stringLength - minimumLower - minimumNumber - minimumSpChar
        if (stringCount > minimumUpper && upperCaseAllowed === true) setMinimumUpper(minimumUpper + 1)
    };

    const handleLowerCaseChange = () => {
        let stringCount = stringLength - minimumUpper - minimumNumber - minimumSpChar
        if (stringCount > minimumLower && lowerCaseAllowed === true) setMinimumLower(minimumLower + 1)
    };

    const handleNumberChange = () => {
        let stringCount = stringLength - minimumUpper - minimumLower - minimumSpChar
        if (stringCount > minimumNumber && numberAllowed === true) setMinimumNumber(minimumNumber + 1)
    };

    const handleSpCharChange = () => {
        let stringCount = stringLength - minimumUpper - minimumLower - minimumNumber
        if (stringCount > minimumSpChar && specialCharAllowed === true) setMinimumSpChar(minimumSpChar + 1)
    };

    useEffect(() => {
        if (upperCaseAllowed) setMinimumUpper(1)
        else setMinimumUpper(0)

        if (lowerCaseAllowed) setMinimumLower(1)
        else setMinimumLower(0)

        if (numberAllowed) setMinimumNumber(1)
        else setMinimumNumber(0)

        if (specialCharAllowed) setMinimumSpChar(1)
        else setMinimumSpChar(0)
    }, [stringLength])

    useEffect(() => {
        if (!upperCaseAllowed && !lowerCaseAllowed) {
            if (numberAllowed) setNumberAllowed(false), setMinimumNumber(0)
            if (specialCharAllowed) setSpecialCharAllowed(false), setMinimumSpChar(0)
        }
    }, [upperCaseAllowed, lowerCaseAllowed, numberAllowed, specialCharAllowed])
    // copy to clip-board
    const copyClipBoard = useCallback(() => {
        copyTextRef.current?.select()
        window.navigator.clipboard.writeText(randomText)
    }, [randomText])

    return (
        <div className='text-yellow-400 flex justify-center'>
            <div className="border-white w-96 border-2 mx-5 py-5 rounded-md relative top-24 h-auto">
                <h1 className="text-center font-bold text-white text-2xl mb-2">Random Password Generator</h1>
                <div>
                    <input
                        type="text"
                        value={randomText}
                        ref={copyTextRef}
                        className="w-80 text-sm h-6 text-white px-1 border-2 border-white rounded-md flex mx-auto mb-3"
                    />
                    <button
                        className="w-72 bg-blue-500 text-white rounded-md p-1 text-xs font-semibold flex justify-center mx-auto mb-3 hover:cursor-pointer hover:bg-blue-700"
                        onClick={copyClipBoard}
                    >
                        COPY
                    </button>
                    <input
                        type="range"
                        min={10} max={256}
                        value={stringLength}
                        onChange={(e) => { setStringLength(e.target.value) }}
                        className="ml-3"
                    />
                    <label htmlFor="length" className="ml-3 text-sm text-orange-500">String Length: ({stringLength})</label>

                    <br />
                    <input
                        type="checkbox"
                        id="upperCase"
                        defaultChecked={upperCaseAllowed}
                        onChange={() => {
                            setUpperCaseAllowed((prev) => !prev),
                                setMinimumUpper(() => (!upperCaseAllowed && (remainingLength > 0)) ? 1 : 0)
                        }}
                        className="ml-3 mt-4"
                    />
                    <label htmlFor="chareater" className="ml-2">Upper Case</label>

                    <br />
                    <input
                        type="checkbox"
                        id="lowerCase"
                        defaultChecked={lowerCaseAllowed}
                        onChange={() => {
                            setLowerCaseAllowed((prev) => !prev),
                                setMinimumLower(() => (!lowerCaseAllowed && (remainingLength > 0)) ? 1 : 0)
                        }}
                        className="ml-3 mt-3"
                    />
                    <label htmlFor="chareater" className="ml-2">Lower Case</label>

                    <br />
                    <input
                        type="checkbox"
                        id="number"
                        checked={numberAllowed}
                        disabled={(!upperCaseAllowed && !lowerCaseAllowed)}
                        onChange={() => {
                            setNumberAllowed((prev) => !prev),
                                setMinimumNumber(() => (!numberAllowed && (remainingLength > 0)) ? 1 : 0)
                        }}
                        className="ml-3 mt-3"
                    />
                    <label htmlFor="number" className="ml-2">Number</label>

                    <br />
                    <input
                        type="checkbox"
                        id="specialCharacter"
                        checked={specialCharAllowed}
                        disabled={(!upperCaseAllowed && !lowerCaseAllowed)}
                        onChange={() => {
                            setSpecialCharAllowed((prev) => !prev),
                                setMinimumSpChar(() => (!specialCharAllowed && (remainingLength > 0)) ? 1 : 0)
                        }}
                        className="ml-3 mt-3"
                    />
                    <label htmlFor="character" className="ml-2">Special Character</label>
                    <br />
                    <label htmlFor="" className="ml-2 text-xs text-green-500"> *Editable special characters</label>
                    <br />
                    <input
                        type="text"
                        id="myInput"
                        name="myInput"
                        value={specialChar}
                        onChange={(event) => setSpecialChar(event.target.value)}
                        className="mt-1 w-80 pl-2 border-2 border-blue-300 rounded-md text-white text-sm flex mx-auto"
                    />

                    <div className="text-white mt-5 flex">
                        <label htmlFor="minimumUpperCase" className="mx-3 text-xs">Select Minimum Upper Case</label>
                        <div className="flex">
                            <button
                                className={`w-8 rounded-md ${minimumUpper > 1 ? 'bg-red-500' : 'bg-gray-400'}`}
                                onClick={() => setMinimumUpper(minimumUpper > 0 ? minimumUpper - 1 : 0)}
                                disabled={minimumUpper === 1}
                            >
                                -
                            </button>
                            <p className="px-3">{minimumUpper}</p>
                            <button
                                className={`w-8 rounded-md ${(remainingLength !== 0 && upperCaseAllowed) ? 'bg-red-500' : 'bg-gray-400'}`}
                                onClick={handleUpperCaseChange}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <div className="text-white mt-4 flex">
                        <label htmlFor="minimumLowerCase" className="mx-3 text-xs">Select Minimum Lower Case</label>
                        <div className="flex">
                            <button
                                className={`w-8 rounded-md ${minimumLower > 1 ? 'bg-red-500' : 'bg-gray-400'}`}
                                onClick={() => setMinimumLower(minimumLower > 0 ? minimumLower - 1 : 0)}
                                disabled={minimumLower === 1}
                            >
                                -
                            </button>
                            <p className="px-3">{minimumLower}</p>
                            <button
                                className={`w-8 rounded-md ${(remainingLength !== 0 && lowerCaseAllowed) ? 'bg-red-500' : 'bg-gray-400'}`}
                                onClick={handleLowerCaseChange}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <div className="text-white mt-4 flex">
                        <label htmlFor="minimumNumber" className="mx-3 text-xs">Select Minimun Number</label>
                        <div className="flex">
                            <button
                                className={`w-8 rounded-md ${(minimumNumber > 1 && numberAllowed) ? 'bg-red-500' : 'bg-gray-400'}`}
                                onClick={() => setMinimumNumber(minimumNumber > 0 ? minimumNumber - 1 : 0)} disabled={minimumNumber === 1}>-</button>
                            <p className="px-3">{minimumNumber}</p>
                            <button
                                className={`w-8 rounded-md ${(remainingLength !== 0 && numberAllowed) ? 'bg-red-500' : 'bg-gray-400'}`}
                                onClick={handleNumberChange}>+</button>
                        </div>
                    </div>

                    <div className="text-white mt-4 flex">
                        <label htmlFor="minimumSpChar" className="mx-3 text-xs">Select Minimun Special Char</label>
                        <div className="flex">
                            <button
                                className={`w-8 rounded-md ${minimumSpChar > 1 ? 'bg-red-500' : 'bg-gray-400'}`}
                                onClick={() => setMinimumSpChar(minimumSpChar > 0 ? minimumSpChar - 1 : 0)}
                                disabled={minimumSpChar === 1}
                            >
                                -
                            </button>
                            <p className="px-3">{minimumSpChar}</p>
                            <button
                                className={`w-8 rounded-md ${(remainingLength !== 0 && specialCharAllowed) ? 'bg-red-500' : 'bg-gray-400'}`}
                                onClick={handleSpCharChange}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <label htmlFor="ramaningLowerCase" className="ml-3 text-xs text-green-400">Remaining length: {remainingLength}</label>
                </div>
            </div>
        </div >
    )
}