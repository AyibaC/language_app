import React from 'react';
import { WordForm } from './../../components/WordsForm/WordsForm';
import Header from './../../components/Header/Header';

export default function AddWord(){
    return( 
    <div>
        <Header />
        <h1>Add Word</h1>
        <WordForm />
    </div>
    );
}