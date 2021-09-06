const Account = require("./accounts-model");
const db= require("../../data/db-config");

//Checking the payload
exports.checkAccountPayload = (req, res, next) => {
    const errorMessage = {status: 400}
    const {name, budget} = req.body;
    if(name === undefined || budget === undefined){
        errorMessage.message = "name and budget are required";
    }
    else if(typeof name !== "string"){
        errorMessage.message = "name of account must be a string";
    }
    else if(name.trim().length < 3 || name.trim().length > 100){
        errorMessage.message = "name of account must be between 3 and 100";
    }
    else if(typeof budget !== "number" || isNaN(budget)){
        errorMessage.message = "budget of account must be a number";
    }
    else if(budget < 0 || budget > 1000000){
        errorMessage.message = "budget is too large or too small";
    }
    if (errorMessage.message){ next(errorMessage) }
    else{
        req.body.name = name.trim();
        next();
    }
}

//Checking to see if name is already taken
exports.checkAccountNameUnique = async (req, res, next) => {
    try{
        //Query the accounts table, assign to existing
        const existing = await db("accounts")
            //where name is in body
            .where("name", req.body.name.trim())
            .first()
        //If the name exists...
        if(existing){ next({status: 400, message: "that name is taken"}) }
        //Otherwise
        else{next()}
    }
    catch(err){next(err)}
}

exports.checkAccountId = async (req, res, next) => {
    try{
        const account = await Account.getById(req.params.id);
        if(!account){
            next({status: 404, message: "account not found"})
        }
        else{
            req.account = account;
            next()
        }
    }
    catch(err){next(err)}

}