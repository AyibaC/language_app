import React, { useState, createContext, useEffect } from 'react';
import { useToasts } from 'react-toast-notifications';
import { useAuth0 } from "@auth0/auth0-react";


const domain = window.location.host;

export const WordsContext = createContext ({
    getWords: () => {},
    addWord: () => {},
    updateWord: () => {},
    deleteWord: () => {},
    loaded: false,
    loading: false,
    error: null,
    words: []
});

export const WordsProvider = (props) => {
    const { getAccessTokenSilently, user, loginWithRedirect } = useAuth0();
    const [accessToken, setAccessToken] = useState(null);

    const [loaded, setLoaded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [words, setWords] = useState([])
    // const [words, setWords] = useState(()=>{
    //     const savedWords = localStorage.getItem('words');
    //     console.log('savedWords', savedWords);
    // if (savedWords === "undefined") {
    //     return [];
    // }
    // return JSON.parse(savedWords);
    // });

    const { addToast } = useToasts();

    useEffect(() => {
        const getToken = async () => {
        console.log("gettng AT", `http://${domain}/api/v1`);
        try {
        const Acctoken = await getAccessTokenSilently();
        console.log("GOT AT", Acctoken);
        setAccessToken(Acctoken);
        console.log("afterSet", accessToken);
        } catch (err) {
        console.log("getAccessTokenSilently err", err);
        if (
            err.error === "login_required" ||
            err.error === "consent_required"
        ) {
            loginWithRedirect();
        }
        }
    };
    if (user) {
        console.log("user", user);
        getToken();
    }
    }, [accessToken, getAccessTokenSilently, loginWithRedirect, user]);

    const getWords = async () => {
        if (loading || loaded || error){
            console.log('error', error);
            return;
        } else {
            setLoading(true);
            //console.log('loading words');
        }
        try{
            const response = await fetch('/api/v1/words', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                }
            });
            if (!response.ok){
                throw response;
            }
            const data = await response.json();
            console.log(data.rows);
            localStorage.setItem('words', JSON.stringify(data.rows));
            setWords(data.rows);
        } catch (err) {
            console.log(err.message || err.statusText)
        } finally {
            setLoading(false);
            setLoaded(true);
        }
    }

    const addWord = async (formData, user) => {
        const user_id = user.sub
        try {
            const response = await fetch('/api/v1/words', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                },
                body: {...formData, user_id}
            })
            if(!response.ok) {
                throw response;
            } else {
                const data = await response.json()
                console.log('response', data.rows);
                const newWords = await getWords();
                localStorage.setItem('words', newWords);
                setWords(newWords);
                addToast(`Word successfully added`, {appearance: 'success'})
            }
        } catch (err) {
            console.log(err.message||err.statusText)
        }
    }

    const updateWord = async(id, formData) => {
        let updatedWord = null
        try {
            const response = await fetch(`/api/v1/words/${id}`,{
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                },
                body: formData
            })
            if(!response.ok){
                throw response;
            } else {
                console.log(response);
                const index = words.findIndex((word) => words._id === id);
                updatedWord = words[index];
                const newWords = [...words.slice(0, index), ...words.slice(index + 1)];
                localStorage.setItem('words', JSON.stringify(newWords));
                setWords(newWords);
                addToast(`${updatedWord.mother_tongue} successfully deleted`, {appearance: 'success'});
            }
        } catch (err) {
            console.log(err.message || err.statusText)
        }
    }

    const deleteWord = async (id) => {
        let deletedWord=null;
        try{
            const response = await fetch(`/api/v1/words/${id}`,{
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                },
            })
            if (!response.ok){
                throw response;
            } else {
                console.log(response);
                const index = words.findIndex((word) => words._id === id);
                deletedWord = words[index];
                // recreate the cars array without that car
                const updatedWords = [...words.slice(0, index), ...words.slice(index + 1)];
                localStorage.setItem('words', JSON.stringify(updatedWords));
                setWords(updatedWords);
                addToast(`${deletedWord.mother_tongue} successfully deleted`, {appearance: 'success'});
            }
        } catch (err) {
            console.log(err.message || err.statusText)
        }
    }

    return (
        <WordsContext.Provider value={{
            getWords,
            addWord,
            updateWord,
            deleteWord,
            loading,
            loaded,
            error,
            words
        }}>
            {props.children}
        </WordsContext.Provider>
    )
}