import { useState } from "react"

export default function RandomColor() {
    const [color, setColor] = useState('#2c077b')
    const haxCodeNum = Math.floor(Math.random() * 1000000).toString(16).padEnd(6, 0)

    return (
        // main div
        <div
            style={{ height: '100vh', background: color }}
            className="flex justify-center">

                <h3 className="absolute top-60 font-extrabold text-5xl text-white border-2 p-5 rounded-xl bg-slate-800">{color}</h3>

            {/* Random color generator button*/}
            <h4 className="absolute bottom-60 text-white font-semibold underline mb-6">Select random color using this Button</h4>
            <button
                type="button"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded absolute bottom-48 h-16"
                onClick={() => { setColor(`#${haxCodeNum}`) }}>
                Change the Color
            </button>

            {/* Fixed color button's group */}
            <h4 className="absolute bottom-20 text-white font-semibold underline mb-2">Select Fixed color using this Navbar</h4>
            <div className="flex justify-center h-14 gap-10 px-10 rounded absolute bottom-5 bg-gray-100 ">
                {/* black button */}
                <button
                    className="font-bold text-black"
                    onClick={() => { setColor('#0a0e07') }}>
                    Black
                </button>

                {/* red button */}
                <button
                    className="font-bold text-red-500"
                    onClick={() => { setColor('#C42424') }}>
                    Red
                </button>

                {/* blue button */}
                <button
                    className="font-bold text-blue-500"
                    onClick={() => { setColor('#24a0c4') }}>
                    Blue
                </button>

                {/* green button */}
                <button
                    className="font-bold text-green-500"
                    onClick={() => { setColor('#4bc424') }}>
                    Green
                </button>

                {/* yellow button */}
                <button
                    className="font-bold text-yellow-500"
                    onClick={() => { setColor('#F5c213') }}>
                    Yellow
                </button>

                {/* yellow button */}
                <button
                    className="font-bold text-gray-400"
                    onClick={() => { setColor('#Eeeaf5') }}>
                    White
                </button>
            </div>
        </div>
    )
}
