import { createContext, useState } from "react";
import run from "../config/gemini";
import he from "he";

export const Context = createContext();

export function ContextProvider({children}){

    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (index, nextWord) => {
        setTimeout(function(){
            setResultData(prev => prev + nextWord)
        }, 75*index)
    }

    const newChat = () => {
        setLoading(false)
        setShowResult(false)
    }

    const onSent = async (prompt) => {
        try{
            setResultData("");
            setLoading(true);
            setShowResult(true);
            let response;
            if(prompt !== undefined){
                response = await run(prompt);
                setRecentPrompt(prompt);
            }else{
                setPrevPrompts(prev => [...prev, input])
                setRecentPrompt(input);
                response = await run(input);
            }
            // setRecentPrompt(input);
            // setPrevPrompts(prev => [...prev, input])


            // const response = await run(input);

            // Mark up the response for HTML rendering
            let formattedResponse = response.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
            formattedResponse = formattedResponse.replace(/\*(.*?)\*/g, "<br> $1");
            formattedResponse = formattedResponse.replace(/\n/g, "<br>");
            formattedResponse = formattedResponse.replace(/\#\#/g, "<b></b>");
            formattedResponse = formattedResponse.replace(/\*/g, "<li>")
            formattedResponse = formattedResponse.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');            formattedResponse = formattedResponse.replace(/\[(.*?)\]/g, "<a>$1</a>")
            
            // setResultData(formattedResponse);
            let newResponseArray = formattedResponse.split(" ");
            for(let i=0; i<newResponseArray.length; i++){
                const nextWord = newResponseArray[i];
                delayPara(i, nextWord+" ")
            }
        }
        catch (error) {
            console.error("Error processing the response:", error);
        } finally {
            setLoading(false);
            setInput("");
        }
    };
    
    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    }

    return (
        <Context.Provider value={contextValue}>
            {children} 
        </Context.Provider>
    )
}