const fs = require("fs");

// All your move functions: F, Fp, F2, R, Rp, R2, U, Up, U2
// (use the ones from your original code)
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

function possibleStates(pos) {
    return [
        {"F": F(pos)}, {"F2": F2(pos)}, {"F'": Fp(pos)},
        {"R": R(pos)}, {"R2": R2(pos)}, {"R'": Rp(pos)},
        {"U": U(pos)}, {"U2": U2(pos)}, {"U'": Up(pos)}
    ];
}

// BFS to generate all states
function generateStates() {
    const solved = "WWWWGGOOBBRRGGOBRRYYY"; // replace with your solved state string
    const visited = new Set();
    const depths = [];
    
    let frontier = [solved];
    visited.add(solved);
    depths.push([solved]);

    let depth = 0;
    while (frontier.length > 0) {
        let nextFrontier = [];
        for (let state of frontier) {
            for (let move of possibleStates(state)) {
                for (let k in move) {
                    let newState = move[k];
                    if (!visited.has(newState)) {
                        visited.add(newState);
                        nextFrontier.push(newState);
                    }
                }
            }
        }
        if (nextFrontier.length > 0) {
            depths.push(nextFrontier);
        }
        frontier = nextFrontier;
        depth++;
        console.log(`Depth ${depth}: ${nextFrontier.length} states`);
    }

    // Save to file
    let fileContent = depths.map(layer => layer.join(",")).join("\n");
    fs.writeFileSync("allValidStates.txt", fileContent);
    console.log("✅ allValidStates.txt generated!");
}

generateStates();
