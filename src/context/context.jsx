import { createContext, useState } from 'react';
import run from '../config/gemini';

export const Context = createContext();

export const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompt, setPrevPrompt] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (index,nextWord)=>{
        setTimeout(function() {
            setResultData(prev=>prev+nextWord);
        },40*index)
    }

const newChat = ()=>{
    setLoading(false);
    setShowResult(false);
   
    
}


    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);
        setRecentPrompt(input);
        setPrevPrompt(prev=>[...prev,input])

        const response = await run(input);
        let responseArray = response.split("**");
        let newResponse = "";  // Initialize newResponse as an empty string

        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                newResponse += responseArray[i];
            } else {
                newResponse += "<b>" + responseArray[i] + "</b>";
            }
        }

        let newResponse2 = newResponse.split("*").join("</br>");
        let newResponseArray = newResponse2.split(" ");
        for(let i= 0;i<newResponseArray.length;i++) {
           const nextWord = newResponseArray[i] 
            delayPara(i,nextWord+" ");
        }
        // setResultData(newResponse2);  // Use newResponse2 instead of newResponse
        setLoading(false);
        setInput("");
    };

    const contextValue = {
        onSent,
        input,
        setInput,
        recentPrompt,
        setRecentPrompt,
        prevPrompt,
        setPrevPrompt,
        showResult,
        setShowResult,
        loading,
        setLoading,
        resultData,
        setResultData,
        newChat
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
