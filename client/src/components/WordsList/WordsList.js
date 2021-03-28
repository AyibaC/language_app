import React, { useEffect, useContext} from 'react';
import { IconButton } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import { Link } from 'react-router-dom';
import { WordsContext } from './../../contexts/wordsContext';
import Header from './../../components/Header/Header';
import { useAuth0 } from "@auth0/auth0-react";

export default function WordsList(){
    const {
        getWords,
        addWord,
        updateWord,
        deleteWord,
        loading,
        loaded,
        error,
        words
    } = useContext(WordsContext);

    const { user } = useAuth0();
    console.log('user', user);

    useEffect(()=>{
        if (!loading && !loaded){
            console.log('fetching words');
            getWords();
        } else {
            console.log('loading', loading);
            console.log('loaded', loaded);
        }
    }, [getWords, words, loading, loaded]);

    if (loading) return <p>Loading...</p>; //TODO: add spinner

//TODO: add alphabet to filter words and button to filter for learned words
    return (
        <div className="word-page">
            <Header />
            <div className="word-grid-container">
                {words.map(({id, mother_tongue, target_language, is_learned})=>{
                    <div key={id} _id={id} className="word-card">
                        {target_language}
                        <IconButton aria-label="update" component={Link} to={`/words/update/${id}`} >
                <Edit />
                </IconButton>
                        <IconButton aria-label="delete" onClick={() => deleteWord(id)} >
                <Delete />
                </IconButton>
                        </div>
                })}
            </div>
        </div>
    )
}