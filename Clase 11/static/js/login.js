var log = false

function login (){
    if (log === false){
    log = true
    document.getElementById('login').style.display = 'block'
    }
    else{
    log = false
    document.getElementById('login').style.display = 'none'
    }
}