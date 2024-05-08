// let goalContainer = document.querySelector('.container')
let progress = document.querySelector("#progress")
let checked = document.querySelectorAll(".checkbox")
let input = document.querySelectorAll(".goal-input")
let progressLabel = document.querySelector("#first-para")
let lastLabel = document.querySelector("#second-para")
let error = document.querySelector("#alert-msg")
let object = JSON.parse(localStorage.getItem('object')) || {}
let countGoal = Object.values(object).filter((value)=> (value.completed))
console.log(countGoal.length)
let buttonContainer = document.querySelector('.button')
// let button = document.querySelector('#add-goal')

// button.addEventListener('click',(e)=>{
//     let div = document.createElement('div')
//     div.setAttribute('class','goal')
//     let innerDiv = document.createElement('div')
//     innerDiv.setAttribute('class','checkbox')
//     let innerInput = document.createElement('input')
//     innerInput.setAttribute('class','goal-input')
//     innerInput.setAttribute('id','fifth')
//     innerInput.setAttribute('placeholder','Add new goal... ')
//     div.appendChild(innerDiv)
//     div.appendChild(innerInput)
//     buttonContainer.insertAdjacentElement('beforebegin',div)
//     innerInput.addEventListener('input',(e)=>{
//         object[e.target.id] = {name:e.target.value, completed:false}
//         localStorage.setItem('object',JSON.stringify(object))
//     })
// })

let allQuotes = [
    'Raise the bar by completing your goals!',
    'Well begun is half done',
    'Just two away, keep going!',
    'Just a step away, keep going!',
    'Wow! you just completed all the goals, time for chill'
]
progress.style.width = `${countGoal.length / input.length * 100}%`
if((countGoal.length >0) && (countGoal.length <=input.length)){
    progress.firstElementChild.innerText = `${countGoal.length}/${input.length} completed`
}else{
    progress.firstElementChild.innerText =""
}
console.log(countGoal.length)
checked.forEach((check)=>{
    check.addEventListener("click",(event)=>{
        let value = [...input].every((inp)=>{
            return inp.value
        })
        if(value){
            check.classList.toggle('selectedCheckbox')
            if(check.classList.contains("selectedCheckbox")){
                check.nextElementSibling.classList.add("checked-goal")
                check.nextElementSibling.disabled = true
            }else{
                check.nextElementSibling.classList.remove("checked-goal")
                check.nextElementSibling.disabled = false
            }
            let inputId = check.nextElementSibling.id
            object[inputId].completed = !object[inputId].completed
            localStorage.setItem("object",JSON.stringify(object))
            countGoal = Object.values(object).filter((value)=> (value.completed) )
            console.log(countGoal.length)
            progress.style.width = `${countGoal.length / input.length * 100}%`
            if(countGoal.length > 0 && countGoal.length <=input.length){
                progress.firstElementChild.innerText = `${countGoal.length}/${input.length} completed`
            }else{
                progress.firstElementChild.innerText =""
            }
            for(let i=0; i<=countGoal.length; i++){
                progressLabel.innerText = allQuotes[i]
            }
            if(countGoal.length === input.length){
                lastLabel.innerText = "Congragulation, You made a great progress" 
            }else{
                lastLabel.innerText = "“Move one step ahead, today!”" 
            }
        }else{
            error.style.display = 'block'
        }
    })
})
input.forEach((inp)=>{
    if(object[inp.id]){
        inp.value = object[inp.id].name
        if(object[inp.id].completed){
            inp.parentElement.firstElementChild.classList.add('selectedCheckbox')
            inp.classList.add("checked-goal")
            inp.disabled=true
            for(let i=0; i<=countGoal.length; i++){
                progressLabel.innerText = allQuotes[i]
            }
            if(countGoal.length === input.length){
                lastLabel.innerText = "Congragulation, You made a great progress"
            }else{
                lastLabel.innerText = "“Move one step ahead, today!”" 
            }
        }
    }
    inp.addEventListener("input",(e)=>{
        object[inp.id]={name: inp.value, completed : false} 
        localStorage.setItem("object",JSON.stringify(object))
    })
})
input.forEach((inp)=>{
    inp.addEventListener("focus",(e)=>{
        error.style.display = "none"
    })
})