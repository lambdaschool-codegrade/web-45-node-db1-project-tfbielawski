const db = require("../../data/db-config");
const getAll = () => {
  //select * from accounts
  return db("accounts");
}

//Gets the Ids
function getById (id) {
  //select * from accounts where id =1
  return db("accounts").where("id",id).first();
}

//Creates a record
const create = async (account) => {
  //INSERT into ACCOUNTS (name, budget) values ("etc", 1000)
  // Query the db, insert account, assign [id] (array of ids)
  const [id] = await db("accounts").insert(account)
  //Return, call getById, pass in id
  return getById(id)
}

//Query the db, then delete, then update
const updateById = async (id, account) => {
  //DELETE from ACCOUNTS where ID = id then update
  await db("accounts").where("id", id).update(account)
  return getById(id)
}

//Query accounts table where ID = id, then delete
//DELETE from ACCOUNTS where ID =
const deleteById = id => {
  return db("accounts").where("id",id).del()
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
