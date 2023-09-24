const root = document.getElementById("root");


alert("Bem vindo ao jogo da velha! Para jogar, clique em uma célula vazia para colocar um X ou um O. O primeiro jogador a conseguir três em linha vence!");
// Gerar uma grade 3x3 usando divs
root.classList.add("grid");

// Criar um array 2D para armazenar referências aos elementos HTML das células
const cellElements = [];

for (let i = 0; i < 3; i++) {
    const row = [];
    for (let j = 0; j < 3; j++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.setAttribute("id", `cell-${i}-${j}`);
        root.appendChild(cell);

        // Armazenar uma referência ao elemento de célula no array 2D
        row.push(cell);
    }
    cellElements.push(row);
}

export enum Sign {
    Cross = 1,
    Circle = 2
}

export class Game {
    constructor(public state = {
        count: 9,
        fields: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
        turn: Sign.Cross,
        gameover: false
    }) {
        // Adicionar ouvintes de evento de clique às células quando a instância do jogo é criada
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const cell = cellElements[i][j];

                cell.addEventListener('click', () => {
                    const sign = this.state.turn;

                    if (!this.state.gameover && this.state.fields[i][j] === 0) {
                        const newCount = this.addSign(i, j, sign);

                        if (newCount === 0 || this.verifyGameover()) {
                            let message = '';
                            if (newCount === 0) {
                                message = "Empate! Fim de jogo!";
                            } else {
                                message = `Jogador ${sign === Sign.Cross ? "X" : "O"} venceu! Fim de jogo!`;
                            }
                        
                            showNotification(message);
                            setTimeout(() => {
                                clearNotification();
                                this.resetGame();
                            }, 2000); // Clear the notification after 2 seconds (adjust as needed)
                        }

                        this.render();
                    }
                });
            }
        }
    }

    addSign(column: number, row: number, sign: Sign) {
        if (this.state.gameover) return;

        if (this.state.fields[column][row] > 0) return;

        this.state.fields[column][row] = sign;

        this.state.turn = sign === Sign.Circle ? Sign.Cross : Sign.Circle;

        return --this.state.count;
    }

    verifyGameover(): boolean {
        if (this.state.count === 0) {
            this.state.gameover = true;
            return true;
        }

        for (let i = 0; i < this.state.fields.length; i++) {
            if (
                this.state.fields[i][0] && this.state.fields[i][0] === this.state.fields[i][1] && this.state.fields[i][1] === this.state.fields[i][2] ||
                this.state.fields[0][i] && this.state.fields[0][i] === this.state.fields[1][i] && this.state.fields[1][i] === this.state.fields[2][i]
            ) {
                this.state.gameover = true;
                return true;
            }

            if (
                this.state.fields[0][0] && this.state.fields[0][0] === this.state.fields[1][1] && this.state.fields[1][1] === this.state.fields[2][2] ||
                this.state.fields[0][2] && this.state.fields[0][2] === this.state.fields[1][1] && this.state.fields[1][1] === this.state.fields[2][0]
            ) {
                this.state.gameover = true;
                return true;
            }
        }

        return false;
    }

    resetGame() {
        // Limpar o estado do jogo e redefinir a grade
        this.state = {
            count: 9,
            fields: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
            turn: Sign.Cross,
            gameover: false
        };

        this.render();
    }

    render() {
        // Loop através das células da grade e atualize suas classes com base no estado do jogo
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const cell = cellElements[i][j];
                const sign = this.state.fields[i][j];

                // Limpar o conteúdo da célula
                cell.innerHTML = '';

                // Adicionar classe apropriada para representar "X" ou "O"
                if (sign === Sign.Cross) {
                    cell.classList.add('cross');
                    cell.innerHTML = '❌'; // Emoji de X
                } else if (sign === Sign.Circle) {
                    cell.classList.add('circle');
                    cell.innerHTML = '⭕'; // Emoji de O
                }
            }
        }
    }
}


function showNotification(message) {
    const notification = document.getElementById("notification");
    notification.textContent = message;
    notification.style.display = "block";
}

function clearNotification() {
    const notification = document.getElementById("notification");
    notification.textContent = "";
    notification.style.display = "none";
}


// Criar uma nova instância da classe Game
const game = new Game();

// Chamar o método render para inicializar a grade
game.render();