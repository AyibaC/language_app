import React from 'react';
import { WordForm } from './../../components/WordsForm/WordsForm';
import Header from './../../components/Header/Header';

export default function UpdateWord(){
    return( 
        <div>
            <Header />
            <h1>Update Word</h1>
            <WordForm />
        </div>
    );
}