const { report } = require("../app");
//const Word = require("../words/words/word.model");
const { errorHandler } = require("./utils");
const { pool } = require("./../database")

exports.getWords = function (req, res) {
    let q = {};
    if(req.params.id) {
        // q._id = req.params.id;
        // const id = q._id;
        const id = req.params.id;
        pool.query('SELECT * FROM words WHERE id = $1', [id], (error, results) => {
            if (error) return errorHandler(res, error);
            if (req.params.id && results.rowCount === 0) return res.status(404).send({message: 'No word with that ID'}); 
            return res.status(200).json(results);
        }) 
    }
    pool.query('SELECT * FROM words ORDER BY id ASC', (error, results) => {
        if (error) return errorHandler(res, error);
        if (req.params.id && results.length === 0) return res.status(404).send({message: 'No word with that ID'}); 
        return res.status(200).json(results);
    })
};

exports.addWord = function (req, res) {
    const { mother_tongue, target_language, owner_id } = req.body;
    console.log("word input", req.body);
    pool.query('INSERT INTO words (mother_tongue, target_language, owner_id) VALUES ($1, $2, $3)', [mother_tongue, target_language, owner_id], (error, results) => {
        if (error) {
        return errorHandler(res, error)
        }
        res.status(201).json(results).send(`Word added with ID: ${results.id}`) //TODO: fix the undefined in success message
    })
};

exports.updateWord = function (req, res) {
    const id = req.params.id;
    const { mother_tongue, target_language } = req.body;
    if(req.body.mother_tongue){
        pool.query(
        'UPDATE words SET mother_tongue = $1 WHERE id = $2',
        [mother_tongue, id],
        (error, results) => {
        if (error) {
            return errorHandler(res, error);
        }
        if (id && results.rowCount === 0) return res.status(404).send({message: 'No word with that ID'}); 
        res.status(200).json(results).send(`Word modified with ID: ${id}`)
        }
    );
} if (req.body.target_language)
    pool.query(
        'UPDATE words SET target_language = $1 WHERE id = $2',
        [target_language, id],
        (error, results) => {
        if (error) {
            return errorHandler(res, error);
        }
        if (id && results.rowCount === 0) return res.status(404).send({message: 'No word with that ID'}); 
        res.status(200).json(results).send(`Word modified with ID: ${id}`)
        }
    );
};

exports.removeWord = function (req, res) {
    const id = req.params.id;
    pool.query('DELETE FROM words WHERE id = $1', [id], (error, results) => {
        //console.log(results);
        if (error) return errorHandler(res, err);
        if (id && results.rowCount === 0) return res.status(404).send({message: 'No word with that ID'}); 
        res.status(200).send(`Word deleted with ID: ${id}`)
    });
};