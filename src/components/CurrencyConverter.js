import React, { useEffect, useState } from 'react'

export default function CurrencyConverter() {
    const [data, setData] = useState({})
    const [country1, setCountry1] = useState("USD")
    const [country2, setCountry2] = useState("INR")
    const [input1, setInput1] = useState(0)
    const [input2, setInput2] = useState(0)
    const [exchangeRate, setExchangeRate] = useState(0)
    const [inputBox, setInputBox] = useState(0)


    useEffect(() => {
        fetch("http://api.exchangeratesapi.io/latest?access_key=5c7bfac090e81fd444840920b7266e4b").then(x => x.json())
            .then((x) => {
                setData(x.rates)
                setInput1(1)
                setExchangeRate(x.rates[country2] / x.rates[country1])
                setInput2((x.rates[country2] / x.rates[country1]).toFixed(2))
            })
    }, [country1]);

    useEffect(() => {
        setExchangeRate(data[country1] / data[country2])
        if (inputBox == 1) {
            setInput2((input1 / exchangeRate).toFixed(2))
        }
        else if (inputBox == 2) {
            setInput1((input2 * exchangeRate).toFixed(2))
        }
    }, [inputBox, input1, input2])


    function handleCountry1(event) {
        setCountry1(event.target.value)
    }
    function handleCountry2(event) {
        setCountry2(event.target.value)
    }
    
    function handleInput1(event) {
        event.preventDefault();
        let input = event.target.value
        if (input < 0 ) {
            setInput1(0)
            setInputBox(1)
        }
        else {
            setInput1(input)
            setInputBox(1)
        }

    }
    function handleInput2(event) {
        event.preventDefault();
        let input = event.target.value
        if (input < 0 ) {
            setInput2(0)
            setInputBox(2)
        }
        else {
            setInput2(input)
            setInputBox(2)
        }
    }
// console.log(Object.keys(data).length);




    return (
        <div>
            <h1>Currency Converter</h1>
            <select onChange={handleCountry1} value={country1}>
                {Object.keys(data).map(item => {
                        return (<option key={item} value={item}>{item}</option>)
                    
                })}
            </select><input type="number" min="0" onChange={handleInput1} value={input1} onKeyDown={(e) => { if (e.key === '-') e.preventDefault() }}></input>
            <br></br>
            <select onChange={handleCountry2} value={country2}>
                {Object.keys(data).map(item => {
                    if (item !== country1) {
                        return (<option key={item} value={item}>{item}</option>)
                    }
                })}
            </select><input type="number" min="0" onChange={ handleInput2 } value={input2} onKeyDown={(e) => { if (e.key === '-') e.preventDefault()}}></input>
        </div>
    )
}
