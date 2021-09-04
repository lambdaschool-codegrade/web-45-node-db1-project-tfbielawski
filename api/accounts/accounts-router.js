const router = require('express').Router();

router.get('/', (req, res, next) => {
    try{
        res.json("get accounts")
    }
    catch(err){next(err)}
})

router.get('/:id', (req, res, next) => {
    try{
        res.json("get accounts by id")
    }
    catch(err){next(err)}
})

router.post('/', (req, res, next) => {
    try{
        res.json("create accounts")
    }
    catch(err){next(err)}
})

router.put('/:id', (req, res, next) => {
    try{
        res.json("update accounts")
    }
    catch(err){next(err)}
});

router.delete('/:id', (req, res, next) => {
    try{
        res.json("delete accounts")
    }
    catch(err){next(err)}
})

router.use((err, req, res, next) => { // eslint-disable-line
    try{
        res.status(err.status || 500).json({message: err.message})
    }
    catch(err){next(err)}
})

module.exports = router;
