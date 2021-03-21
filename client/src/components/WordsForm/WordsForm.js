import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Button,
    TextField,
    FormControl,
    InputLabel,
} from "@material-ui/core";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { useParams } from "react-router-dom";
import { WordsContext } from './../../contexts/wordsContext'

const schema = yup.object().shape({
    mother_tonque: yup.string().required(),
    target_language: yup.string().required()
});

//TODO: add yup
export function WordForm({initialValues}){
    const defaultValues = {
        mother_tongue: "",
        target_language: ""
    };

    const { addWord, updateWord } = useContext(WordsContext);
    const [populated, setPopulated] = useState(false);
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = function(formValues){
        if (populated) {
            const updates = {};
            for (const key in initialValues) {
            if (initialValues.hasOwnProperty(key)) {
                if (initialValues[key] !== formValues[key] && key[0] !== "_") {
                updates[key] = formValues[key];
            }
            console.log("updates", updates);
            updateWord(initialValues.id, updates);
        } else {
            addWord(formValues);
        }
        reset(defaultValues);
        };
    }};

    if (initialValues && !populated) {
        // initialValues.price = initialValues.price / 100;
        reset({
        initialValues
        });
        setPopulated(true);
    };

    

    return (
        <FormControl onSubmit={handleSubmit(onSubmit)}>
            <InputLabel for="mother_tongue">Mother Tongue</InputLabel>
            <TextField name="mother_tongue" type="text" ref={register} />

            <InputLabel for="target_language">Target Language</InputLabel>
            <TextField name="target_language" type="text" ref={register} />

            <Button type="submit">Submit</Button>
        </FormControl>
    )
};