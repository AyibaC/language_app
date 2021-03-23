import React, { useEffect, useContext} from 'react';
import { IconButton } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import { Link } from 'react-router-dom';
import './words.css';
import { WordsContext } from './../../contexts/wordsContext';

export default function Words(){
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
            <h1>Words</h1>
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