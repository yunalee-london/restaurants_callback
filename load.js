const {Database} = require('sqlite3')
const db = new Database(":memory:")
const restaurants = require('./restaurants')
const menus = require ('./menus')
const items = require('./items')

const load = (tableName, data, callback) => {
    if (data.length === 0) return callback(db)

    const datum = data.pop()
    const fields = Object.keys(datum)
    const values = Object.values(datum)
    
    db.run(`INSERT INTO ${tableName} (${fields.join(',')}) VALUES(?,?,?);`, Object.values(datum), function(err){
        if (err) throw new Error(err)
        load(tableName, data, callback)
    })
}
    
   


module.exports = {load, db}