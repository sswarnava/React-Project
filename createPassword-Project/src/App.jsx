import { useState, useCallback, useEffect } from "react"

export default function App() {
  const [passwordLenght, setpasswordLength] = useState(8)
  const [numberAllowed, setnumberAllowed] = useState(false)
  const [charAllowed, setcharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordGenerator = useCallback(() => {
    let passW = ''
    let passStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

    if (numberAllowed) passStr += '0123456789'
    if (charAllowed) passStr += '@#%+&*:"'

    for (let i = 1; i <= passwordLenght; i++) {
      let randomCharIndex = Math.floor(Math.random() * passStr.length + 1)
      passW += passStr.charAt(randomCharIndex)
    }
    setPassword(passW)

  }, [passwordLenght, numberAllowed, charAllowed, setPassword])

  useEffect(() => {
    passwordGenerator()
  }, [passwordLenght, numberAllowed, charAllowed, setPassword])


  return (
    <>
      <div className="bg-black text-white flex justify-center" style={{ height: '100vh' }}>
        <div className="my-auto px-10 py-5 rounded bg-blue-700">
          <h2 className="text-center font-bold mb-2">Password Generator</h2>
          <input type="text" className="rounded mr-4 mb-3 text-black pl-4" value={password} readOnly />
          <button className="bg-black px-3 py-0.5 rounded-2xl font-semibold">Copy</button>
          <br />

          <input type="range" min='8' max='15' className=" w-24 mr-2 relative top-1" onChange={(e) => { setpasswordLength(e.target.value) }} value={passwordLenght} />
          <label htmlFor="length" className="text-sm">lenght ({passwordLenght})</label>
          <br />
          <input type="checkbox" id="number" className="mr-2 mt-3" onChange={() => { setnumberAllowed((prev) => !prev) }} />
          <label htmlFor="number" className="text-sm mr-5 relative top-0.5">Number</label>

          <input type="checkbox" id="character" className="mr-2" onChange={() => { setcharAllowed((prev) => !prev) }} />
          <label htmlFor="character" className="text-sm mt-2 relative top-0.5">Character</label>
        </div>
      </div>
    </>
  )
}