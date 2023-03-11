function F(pos){
    return (pos[6] + pos[14] + pos[2] +
            pos[3] + pos[5] + pos[13] +
            pos[19] + pos[7] + pos[8] +
            pos[9] + pos[10] + pos[1] +
            pos[4] + pos[12] + pos[18] +
            pos[15] + pos[16] + pos[0] +
            pos[11] + pos[17] + pos[20])
        }

function Fp(pos){
    return (pos[17] + pos[11] + pos[2] +
            pos[3] + pos[12] + pos[4] +
            pos[0] + pos[7] + pos[8] +
            pos[9] + pos[10] + pos[18] +
            pos[13] + pos[5] + pos[1] +
            pos[15] + pos[16] + pos[19] +
            pos[14] + pos[6] + pos[20])
        }

function F2(pos){
    return (pos[19] + pos[18] + pos[2] +
            pos[3] + pos[13] + pos[12] +
            pos[17] + pos[7] + pos[8] +
            pos[9] + pos[10] + pos[14] +
            pos[5] + pos[4] + pos[11] +
            pos[15] + pos[16] + pos[6] +
            pos[1] + pos[0] + pos[20])
        }

function R(pos){
            return (pos[12] + pos[1] + pos[2] +
                    pos[4] + pos[18] + pos[5] +
                    pos[6] + pos[7] + pos[8] +
                    pos[0] + pos[11] + pos[17] +
                    pos[20] + pos[13] + pos[14] +
                    pos[3] + pos[10] + pos[16] +
                    pos[15] + pos[19] + pos[9])
        }

function Rp(pos){
            return (pos[9] + pos[1] + pos[2] +
                    pos[15] + pos[3] + pos[5] +
                    pos[6] + pos[7] + pos[8] +
                    pos[20] + pos[16] + pos[10] +
                    pos[0] + pos[13] + pos[14] +
                    pos[18] + pos[17] + pos[11] +
                    pos[4] + pos[19] + pos[12])
        }
 
function R2(pos){
            return (pos[20] + pos[1] + pos[2] +
                    pos[18] + pos[15] + pos[5] +
                    pos[6] + pos[7] + pos[8] +
                    pos[12] + pos[17] + pos[16] +
                    pos[9] + pos[13] + pos[14] +
                    pos[4] + pos[11] + pos[10] +
                    pos[3] + pos[19] + pos[0])
        }     
        
function U(pos){
            return (pos[3] + pos[0] + pos[1] +
                    pos[2] + pos[10] + pos[11] +
                    pos[4] + pos[5] + pos[6] +
                    pos[7] + pos[8] + pos[9] +
                    pos[12] + pos[13] + pos[14] +
                    pos[15] + pos[16] + pos[17] +
                    pos[18] + pos[19] + pos[20])
        }
           
function Up(pos){
            return (pos[1] + pos[2] + pos[3] +
                    pos[0] + pos[6] + pos[7] +
                    pos[8] + pos[9] + pos[10] +
                    pos[11] + pos[4] + pos[5] +
                    pos[12] + pos[13] + pos[14] +
                    pos[15] + pos[16] + pos[17] +
                    pos[18] + pos[19] + pos[20])
        }
          
function U2(pos){
            return (pos[2] + pos[3] + pos[0] +
                    pos[1] + pos[8] + pos[9] +
                    pos[10] + pos[11] + pos[4] +
                    pos[5] + pos[6] + pos[7] +
                    pos[12] + pos[13] + pos[14] +
                    pos[15] + pos[16] + pos[17] +
                    pos[18] + pos[19] + pos[20])
        }


function possibleStates(pos){
    return Array({"F":F(pos)}, {"F2":F2(pos)}, {"F prime":Fp(pos)},
                {"R":R(pos)}, {"R2": R2(pos)}, {"R prime":Rp(pos)}, 
                {"U":U(pos)}, {"U2":U2(pos)}, {"U prime":Up(pos)})
}

let fileContent;

let depths = {}

async function solve(pos) {
  try {
    const response = await fetch('allValidStates.txt');
    fileContent = await response.text();
     // print the content to the console
    // call another function or do something else with the content
  } catch (error) {
    console.log(error);
  }
  let states = fileContent.split("\n")
//   console.log(states[3])
  for(var i = 0; i<states.length; i++ ){
    var state = states[i].slice();
    state = state.slice(0,(state.length-2));
    state = state.split(",");

    for (let i = 0; i < state.length; i++) {
        state[i] = state[i].slice(2);
        state[i] = state[i].replace("'", "");
    }
    depths[i] = state;

   }
   
  
  
function locate_state(pos){
  for (let i = 0; i < 12; i++) {
    if(depths[i].includes(pos)){
        let depth = i;
        return depth;
            }
        }
    return null;
    }
    
    let depth = locate_state(pos);
    
    if (depth == null) {
        return null;
    }
    
    console.log("starting depth is "+depth);
    
    let position = pos;
    let moves = [];
    while(depth>0) {
        var positions = possibleStates(position);
        //console.log(positions)
        for (const x of positions) {
            for (const key in x) {
                //console.log(key, x[key])
                if (locate_state(x[key])<depth) {
                    //console.log(key, x[key]);
                    depth = locate_state(x[key]);
                    //console.log(depth);
                    position = x[key];
                    moves.push(key);
                    
                }
                
            }
        }
    }
    console.log(moves);
    return moves;
}


async function solveCube(){
    let position = document.getElementById("position").value;
    if(position == "" || position.length != 21){
        document.getElementById("solution").innerHTML = "Input not acceptable";
        return;
    }

    document.getElementById("solution").innerHTML = "";

    position = position.toUpperCase();
    let moves = await solve(position);

    if(moves == null){
        document.getElementById("solution").innerHTML = "Specified cube state is not possible";
    }
    else{
    document.getElementById("solved").innerHTML = "The moves needed to solve the cube are:"

    
    for (let i = 0; i < moves.length; i++) {
        document.getElementById("solution").innerHTML +=i+1 +". "+moves[i] + "</br>";
        
        }
    }
    document.getElementById('resetBtn').style.display = 'block';
    
}
function reset(){
    window.location.reload()
}

