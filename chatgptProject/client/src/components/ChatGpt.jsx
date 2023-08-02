import React, { useState } from "react";
import axios from "axios";

export default function ChatGpt() {
    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState("");
    const HTTP = "http://localhost:8020/chat";

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post(`${HTTP}`, { prompt })
            .then((res) => {
                setResponse(res.data);
                console.log(prompt);
            })
            .catch((error) => {
                console.log(error);
            });

        setPrompt("");
    };

    const handlePrompt = (e) => {
        setPrompt(e.target.value);
    };
    return (
        <div className="container">
            <h2 className="title">Hello Buddy</h2>
            <div className="answerDiv">
                <p className="text-light">
                    {response ? response : "Generating......"}
                </p>
            </div>
            <form className="form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter Your question ..."
                    value={prompt}
                    onChange={handlePrompt}
                />
                <button className="btn" type="submit">Go</button>
            </form>

        </div>
    )
}
