let boxes=document.querySelectorAll(".box");
let resetbtn=document.querySelector("#reset-btn");
let newgamebtn=document.querySelector("#new-btn")
let msgcontainer=document.querySelector(".msg-container")
let msg=document.querySelector("#msg")
let blast = document.getElementById("blast");
let turnO=true;
const winpatterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
]

const resetgame=()=>{
    turnO=true
    enableboxes()
    msgcontainer.classList.add("hide")
}

boxes.forEach((box) => {
    box.addEventListener("click",()=>{
        if(turnO){
            box.innerText="O"
            box.classList.add("o-color")
            turnO=false
        }else{
            box.innerText="X"
             box.classList.add("x-color")
            turnO=true
        }
        box.disabled=true
        checkWinner();
    })
});
const disableboxes=()=>{
    for(let box of boxes){
        box.disabled=true
    }
}
const enableboxes=()=>{
    for(let box of boxes){
        box.disabled=false
        box.innerText=""
        box.classList.remove("o-color","x-color")
    }
}
const showBlast = () => {
    for (let i = 0; i < 60; i++) {
        let particle = document.createElement("span");

        particle.style.left = Math.random() * 100 + "vw";
        particle.style.top = Math.random() * 100 + "vh";

        // random direction movement
        let x = (Math.random() - 0.5) * 300;
        let y = Math.random() * 400;

        particle.style.transform = `translate(${x}px, ${y}px)`;

        particle.style.backgroundColor =
            Math.random() > 0.5 ? "#00f5ff" : "#ff2e63";

        blast.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 1000);
    }
};

const showWinner=(winner)=>{
    msg.innerText=`Congratulations, Winner is ${winner} `
    msgcontainer.classList.remove("hide")
    disableboxes()
    showBlast()

}
const checkWinner=()=>{
    for(let pattern of winpatterns){
        
        let pos1val=boxes[pattern[0]].innerText
        let pos2val=boxes[pattern[1]].innerText
        let pos3val=boxes[pattern[2]].innerText
        if(pos1val !="" &&pos2val!=""&&pos3val!=""){
            if(pos1val===pos2val&&pos2val===pos3val){
                console.log("Winner",pos1val)
                showWinner(pos1val)

            }

        }

    }
}
newgamebtn.addEventListener('click',resetgame)
resetbtn.addEventListener('click',resetgame)