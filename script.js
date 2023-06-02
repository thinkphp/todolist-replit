var input = document.querySelector("input"),
    span_add = document.querySelector("span#add"),
    ul = document.querySelector("ul"),
    span_x,
    li

    input.addEventListener("keyup", function(event) {

      // Number 13 is the "Enter" key on the keyboard
      if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        span_add.click();
      }

    });

span_add.onclick = () => {
    newElement();
}

function newElement() {

   if(input.value != "" && input.value != " ") {
      var id = Math.random()
      li = document.createElement("li")
      li.innerText = input.value
      li.id = id
      span_x = document.createElement("span")
      span_x.innerText = "\u00D7"
      span_x.className = "x"
      let checkbox = document.createElement("input")
      checkbox.type = "checkbox"
      checkbox.className = "checkbox"
      li.appendChild(checkbox)
      li.appendChild(span_x)
      ul.appendChild(li)
      var myObject = {'id': id,
                     'text':input.value,
                     'checked':'',
                     'check': 0}

      localStorage["item"+id] = JSON.stringify(myObject)

   } else {
     alert("Please Fill Out The Input!")
   }

   input.value = ""
   handleCheck()
   handleX()
}

function handleCheck() {

  var checkboxs = document.querySelectorAll("ul li input[type=checkbox]")

      checkboxs.forEach(checkbox => {

          var parent = checkbox.parentElement

          console.log(parent)

              checkbox.onclick = () => {
                if(!parent.classList.contains('checked')) {
                    console.log(parent.id)
                    let obj = JSON.parse(localStorage.getItem('item'+parent.id))
                    console.log(obj)
                    Object.keys(obj).forEach(key => {
                       if(key=='checked') obj[key] = 'checked';
                       if(key=='check') obj[key] = 1;
                    });
                    localStorage["item"+parent.id] = JSON.stringify(obj)

                    parent.classList.add('checked')

                } else {
                    console.log(parent.id)
                    var obj = JSON.parse(localStorage.getItem('item'+parent.id))
                    parent.classList.remove('checked')
                    Object.keys(obj).forEach(key => {
                       if(key=='checked') obj[key] = '';
                       if(key=='check') obj[key] = 0;
                    });
                    localStorage["item"+parent.id] = JSON.stringify(obj)
                }
              }
      })
}

function handleX() {

     var spansX = document.querySelectorAll("ul li span")

     spansX.forEach(span => {

            span.onclick = () => {

              if( confirm("Are you Sure?!") == true ) {

                 var parent = span.parentElement

                 var values = (parent.innerText).slice(0, parent.innerText.length - 1).trim()

                 for(var okok in localStorage) {

                        if(okok == 'item'+parent.id) {

                           localStorage.removeItem('item'+parent.id)
                        }
                 }
                 parent.style.display = 'none'
               }
            }
     })
}

document.addEventListener("DOMContentLoaded", () => {

  console.log(localStorage)
  //localStorage.clear()
  for(let i in localStorage) {

      if(localStorage.getItem(i) != null) {

            var output = JSON.parse(localStorage.getItem(i))

            let list = Object.assign(document.createElement("li"), {
                id: output['id'],
                innerText: output['text'],
                className: output['checked']
            });

            let span_x = document.createElement("span");
                span_x.innerText = "\u00D7";
                span_x.className = "x";
            let checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.checked = output['check']
                checkbox.className = "checkbox";
                list.appendChild(span_x);
                list.appendChild(checkbox);
                ul.appendChild(list);
      }
    }
    handleCheck()
    handleX()
})
