import React, { useState, createContext } from 'react';
import { useToasts } from 'react-toast-notifications';

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
    const [loaded, setLoaded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [words, setWords] = useState(()=>{
        return JSON.parse(localStorage.getItem('words')) || [];
    });

    const { addToast } = useToasts();

    const getWords = async () => {
        if (loading || loaded || error){
            console.log('error', error);
            return;
        } else {
            setLoading(true);
            console.log('loading words');
        }
        try{
            const response = await fetch('api/v1/words');
            if (!response.ok){
                throw response;
            }
            const data = await response.json();
            console.log(data.rows);
            localStorage.setItem('words', data.words);
            setWords(data.rows);
        } catch (err) {
            console.log(err.message || err.statusText)
        } finally {
            setLoading(false);
            setLoaded(true);
        }
    }

    const addWord = async (formData) => {
        try {
            const response = await fetch('/api/v1/words', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: formData
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
            const response = await fetch(`api/v1/words/${id}`,{
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
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