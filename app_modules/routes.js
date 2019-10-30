module.exports = function(router)
{
  const path = require('path')
  const fs = require('fs')
  const render = require(path.join(__dirname, 'render'))
  const kv = require(path.join(__dirname, 'kv'))
  const helper = require(path.join(__dirname, 'helper'))

  router
  .get('/', (req, res) => {
    const block = fs.readFileSync('./views/index.html', 'utf8')
    const template = fs.readFileSync('./views/template.html', 'utf8')

    res.send(render(template, {content: block}))
  })

  .get('/kv', (req, res) => {
    const data = { title: "KV list", json: helper.mapToObj(kv.data)}

    const block = fs.readFileSync('./views/list.html', 'utf8')
    const template = fs.readFileSync('./views/template.html', 'utf8')
    const content = render(block, data)

    res.send(render(template, {content: content, jscripts: ['list'], stylesheets: ['main', 'list']}))
  })

  .post('/kv',function(req, res) {
    var params_str = '';
    req.on("data",function(chunk){
        params_str += chunk.toString();
    });
    req.on("end",function() {
        params = helper.fetchInput(params_str)
        const err = kv.add(params.key, params.value)
        res.send({ error: err })
    });
  })

  .put('/kv/:key',function(req, res) {
    var params_str = '';

    req.on("data",function(chunk){
        params_str += chunk.toString();
    });

    req.on("end",function() {
        params = helper.fetchInput(params_str)

        const err = kv.update(this.params.key, params.value)
        res.send({ error: err })
    });
  })

  .delete('/kv/:key',function(req, res){
    const err = kv.remove(req.params.key)

    res.send({ error: err })
  });
}
