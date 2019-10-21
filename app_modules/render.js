module.exports = function(template, data) {
  for (let key in data) {
    let regex = new RegExp('\{\%\ *' + key + '\ *\%\}', 'gi')
    let matches = template.match(regex)
    let value = data[key]

    if(matches) {
      matches.forEach(function(matched) {
        let matched_idx = template.indexOf(matched)

        if(value instanceof Object) {
          let end_regex = /\{\%\s*end\s*\%\}/
          let matched_end_data = template.match(end_regex)

          if(matched_end_data) {
            let end_idx = matched_end_data['index']
            let block = template.slice(matched_idx + matched.length, end_idx)
            let generated_html = []

            if(Array.isArray(value)) {
              let before = ''
              let after = ''

              switch(key) {
                case 'stylesheets':
                  before = '<link rel="stylesheet" type="text/css" href="assets/styles/'
                  after = '.css" />'
                  break;
                case 'jscripts':
                  before = '<script src="assets/js/'
                  after = '.js"></script>'
                  break;
              }

              value.forEach(function(item) {
                generated_html.push(block.replace(/\{\%\s*.\s*\%\}/gi, before + item + after))
              })

            } else {
              for (let k in value) {
                let generated_block = block.replace(/\{\%\s*.\s*\%\}/gi, k)
                generated_html.push(generated_block.replace(/\{\%\s*..\s*\%\}/gi, value[k]))
              }
            }

            template = template.substr(0, end_idx) + template.substr(end_idx + matched_end_data[0].length);
            template = template.replace(block, generated_html.join(''))
          }

          template = template.substr(0, matched_idx) + template.substr(matched_idx + matched.length);
        } else {
          template = template.replace(matched, value)
        }
      })
    }
  }

  return template.replace(/\{\%\s*[a-zA-Z0-9._/:-]+?\s*\%\}/gi, '')
}
