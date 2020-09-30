const {load, db} = require("./load")
const restaurants = require('./restaurants')
const menus = require('./menus')
const items = require('./items')
describe('Load', () => {
    beforeAll((done) => {
        db.exec('CREATE TABLE IF NOT EXISTS restaurants(id INTEGER PRIMARY KEY, name TEXT, image TEXT); CREATE TABLE IF NOT EXISTS menus(id INTEGER PRIMARY KEY, title TEXT, restaurant_id INTEGER);CREATE TABLE IF NOT EXISTS items(id INTEGER PRIMARY KEY, title TEXT, menu_id INTEGER)', done)
    })
    test("Loads restaurants", (done) => {
        const callback = db => {
            db.all("SELECT * FROM restaurants;", (err, rows) => {
                expect(rows.length).toBe(3)
                done()
            })
        }
        load('restaurants', restaurants, callback)
    })
    test("loads menus", (done) => {
        const callback = db => {
            db.all("SELECT * FROM menus;", (err, rows) => {
                expect(rows.length).toBe(10)
                done()
            })
        }
        load('menus', menus, callback)
    })
    test("loads items", (done) => {
        const callback = db => {
            db.all("SELECT * FROM items;", (err, rows) => {
                expect(rows.length).toBe(1)
                done()
            })
        }
        load('items', items, callback)
    })
})
