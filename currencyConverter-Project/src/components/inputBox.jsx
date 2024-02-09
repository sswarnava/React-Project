import { useId } from "react";

function InputBox({ label, amount, onAmountCng, onCurrencyCng, currencyOptions = [], selectCurrency, amountDisable = false}) {

    const amountInputId = useId()
    return (
        <div className='p-3 rounded-lg text-sm'>
            <div>
                <label
                    htmlFor={amountInputId}
                    className="text-black mb-2 inline-block font-bold text-xl">
                    {label}
                </label>
                <br />
                <input 
                id={amountInputId} 
                className="p-2 border-2 rounded-lg text-lg mx-4" 
                type="number" 
                disabled={amountDisable} 
                onChange={(e) => onAmountCng && onAmountCng(Number(e.target.value))} 
                value={amount} />
            </div>
            <div className="flex justify-center">
                <p className="text-black my-4 w-full font-semibold">Currency Type - </p>
                <select
                    className="mt-4 rounded-md bg-gray-300 cursor-pointer outline-none w-16 h-5"
                    value={selectCurrency} onChange={(e) => onCurrencyCng && onCurrencyCng(e.target.value)}
                >
                    {currencyOptions.map((currency) => (
                        <option key={currency} value={currency}>
                            {currency}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default InputBox;
