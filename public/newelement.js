JSONForm.fieldTypes['help_custom'] = {
    'template':'<span class="help-block" style="padding-top:5px"><%= elt.helpvalue %></span>',
    'fieldtemplate': true
  };
  JSONForm.fieldTypes['autocomplete'] = {
    template:'<div><input type="text" class="form-control" name=<%=node.name%> autocomplete="off" /><div class="dropdown_suggestion hidden"></div></div>',
    inputfield: true,
    fieldtemplate: true,
    onInsert: function(evt, node){
      console.log(node);
      var z = $(`label[for='${node.id}']`).next().find("div input")
      z.keyup(function (evt) {
          var value = $(evt.target).val();
          var dropDown = $(`label[for='${node.id}']`).next().find("div div")
          dropDown.addClass('hidden');
                        if(value.length > 0){
                            console.log(node.formElement.description+"this is a form element")
                        $.ajax(
                            {
                                url: "http://guru.southindia.cloudapp.azure.com:8051/"+node.formElement.description,
                                data: {
                                    q:value
                                    },
                                type: "GET",
                                success: function(data){
                                  console.log(data)
                                    dropDown.removeClass('hidden');
                                    dropDown.html("");
                                    data.map((suggestion,i)=>{
                                      dropDown.append(`<p class="suggestion123" onclick="pclick(this)">${suggestion.display_name}::${suggestion.id}<span style="color:white"></span></p>`)
                                    })
                                    }
                            }
                        )
                      }
        });
      }
    }
  function pclick(element){
    var x = $(element).parent().parent().find('input')
    x.val(element.innerText);
    $(element).parent().addClass('hidden')
  }