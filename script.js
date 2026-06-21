const roles = [

"Cloud Engineer",
"AWS Engineer",
"DevOps Engineer",
"Terraform Specialist",
"Kubernetes Enthusiast"

];

let role = 0;
let char = 0;

const typing =
document.getElementById("typing");

function type(){

if(char < roles[role].length){

typing.innerHTML +=
roles[role].charAt(char);

char++;

setTimeout(type,100);

}
else{

setTimeout(erase,1500);

}

}

function erase(){

if(char > 0){

typing.innerHTML =
roles[role].substring(0,char-1);

char--;

setTimeout(erase,50);

}
else{

role++;

if(role >= roles.length){

role = 0;

}

setTimeout(type,300);

}

}

type();
