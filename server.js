
const express = require('express')
const path = require('path')
const app = express()
const router = express.Router()

require(path.join(__dirname, 'app_modules', 'routes'))(router)

app.set('port', process.env.PORT || 3005)

app.listen(app.get('port'), function() {
  console.log("Listening on " + app.get('port'))
});

app.use('/', router)
//Store all HTML files in views folder
app.use('/views', express.static(path.join(__dirname, '/views')))
//Store all JS, CSS and static files in assets folder.
app.use('/assets', express.static(path.join(__dirname, '/assets')))
