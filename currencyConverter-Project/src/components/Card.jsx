import { useState } from "react";
import InputBox from "./inputBox";

import useCurrencyInfo from "../hooks/useCurrencyinfo";

import { MdOutlineSwapVert } from "react-icons/md";

export default function Card() {
    const [amount, setAmount] = useState(1)
    const [amountFrom, setAmountFrom] = useState("usd")
    const [amountTo, setAmountTo] = useState("inr")
    const [convertedAmount, setConvertedAmount] = useState(0)

    const crurencyInfo = useCurrencyInfo(amountFrom)
    const options = Object.keys(crurencyInfo)

    const swap = () => {
        setAmountFrom(amountTo)
        setAmountTo(amountFrom)
        setConvertedAmount(amount)
        setAmount(convertedAmount)
    }

    const convert = () => {
        setConvertedAmount((amount * crurencyInfo[amountTo]).toFixed(2))
    }

    return (
        <div>
            <div className="w-full p-5">
                <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 bg-slate-100 shadow-xl">
                    <form onSubmit={(e) => { e.preventDefault(); convert()}}>

                        {/* First Input Box*/}
                        <div className="w-full mb-1">
                            <InputBox
                                label="From"
                                amount={amount}
                                currencyOptions={options}
                                onAmountCng={(amount) => { if (amount >= 0) setAmount(amount) }}
                                onCurrencyCng={(currency) => setAmountFrom(currency)}
                                selectCurrency={amountFrom}
                            />
                        </div>

                        {/* swap button */}
                        <div className="relative w-full h-0.5">
                            <button type="button"
                                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-3xl bg-orange-600 text-white p-3 w-12 h-12 text-xl" onClick={swap}>
                                <MdOutlineSwapVert/>
                            </button>
                        </div>

                        {/* Second Input Box*/}
                        <div className="w-full mt-1 mb-4">
                            <InputBox
                                label="To"
                                amount={convertedAmount}
                                currencyOptions={options}
                                onCurrencyCng={(currency) => setAmountTo(currency)}
                                selectCurrency={amountTo}
                                amountDisable
                            />
                        </div>

                        {/* convert button */}
                        <button type="submit" className="w-full bg-blue-800 text-white px-4 py-3 rounded-lg">
                            Convert {amountFrom.toUpperCase()} to {amountTo.toUpperCase()}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
