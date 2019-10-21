$(document).ready(() => {
  $('.remove').on('click', (e) => {
    e.preventDefault()
    $target = $(e.target)
    var link = $target.attr('href')

    start_ajax(link, 'DELETE', null, function(){
      window.location = '/kv'
    })
  })

  // $("form").submit((e) => { //ask Marik
  $("form").submit(function(e) {
    e.preventDefault()

    let form = $(this)
    let url = form.attr('action')

    $('.error').html('')

    let errors = check_form_data(form)

    if(! errors.length) {
      start_ajax(url, 'POST', form.serialize(), function(){
        window.location = '/kv'
      })
    } else {
      $('.error').html(errors.join(', '))
    }
   })

   $(".editable").on('click', function(e){
     let el = $(this)
     let parent_el = el.closest('li')

     let value = $(this).html()
     let key = parent_el.find('strong').html()


     let form = $("<form/>", {
       action: `kv/${key}`,
       method: "post"
     })

     let input = $("<input/>", {
       type: "text",
       name: "value",
       class: "changed_value",
       value: value
     })

     form.append(input)
     el.replaceWith(form)

     form.bind('focusout', function(event) {
       $(this).submit()
     }).bind('submit', function(event) {
       event.preventDefault()

       let form = $(this)
       let url = form.attr('action')

       let errors = check_form_data(form)

       if(! errors.length) {
         start_ajax(url, 'PUT', form.serialize(), function(){
           window.location = '/kv'
         })
       } else {
         $('.error').html(errors.join(', '))
       }

       start_ajax(url, 'PUT', form.serialize(), function(){
         window.location = '/kv'
       })
     })

     let new_input = $(".changed_value")
     new_input.focus()
   })
})

function check_form_data(form) {
  let errors = []

  $(form).find('input').each(function(index, elem) {
    if($(elem).val().length == 0) {
      errors.push(`empty ${$(elem).attr('name')}`)
    }
  });

  return errors
}

function start_ajax(url, method, data, callback) {
  $.ajax({
      type: method,
      url: url,
      data: data,
      success: (response) => {
        if(response.error === "200OK") {
          callback()
        } else {
          $('.error').html(response.error)
        }
      },
      error: (err) => {
        console.log(err)
      }
  })
}
