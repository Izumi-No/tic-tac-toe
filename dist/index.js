function _class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _create_class(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
var root = document.getElementById("root");
alert("Bem vindo ao jogo da velha! Para jogar, clique em uma c\xe9lula vazia para colocar um X ou um O. O primeiro jogador a conseguir tr\xeas em linha vence!");
// Gerar uma grade 3x3 usando divs
root.classList.add("grid");
// Criar um array 2D para armazenar referências aos elementos HTML das células
var cellElements = [];
for(var i = 0; i < 3; i++){
    var row = [];
    for(var j = 0; j < 3; j++){
        var cell = document.createElement("div");
        cell.classList.add("cell");
        cell.setAttribute("id", "cell-".concat(i, "-").concat(j));
        root.appendChild(cell);
        // Armazenar uma referência ao elemento de célula no array 2D
        row.push(cell);
    }
    cellElements.push(row);
}
export var Sign;
(function(Sign) {
    Sign[Sign["Cross"] = 1] = "Cross";
    Sign[Sign["Circle"] = 2] = "Circle";
})(Sign || (Sign = {}));
export var Game = /*#__PURE__*/ function() {
    "use strict";
    function Game() {
        var _loop = function(i) {
            var _loop = function(j) {
                var cell = cellElements[i][j];
                cell.addEventListener("click", function() {
                    var sign = _this.state.turn;
                    if (!_this.state.gameover && _this.state.fields[i][j] === 0) {
                        var newCount = _this.addSign(i, j, sign);
                        if (newCount === 0 || _this.verifyGameover()) {
                            var message = "";
                            if (newCount === 0) {
                                message = "Empate! Fim de jogo!";
                            } else {
                                message = "Jogador ".concat(sign === Sign.Cross ? "X" : "O", " venceu! Fim de jogo!");
                            }
                            showNotification(message);
                            setTimeout(function() {
                                clearNotification();
                                _this.resetGame();
                            }, 2000); // Clear the notification after 2 seconds (adjust as needed)
                        }
                        _this.render();
                    }
                });
            };
            for(var j = 0; j < 3; j++)_loop(j);
        };
        var state = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {
            count: 9,
            fields: [
                [
                    0,
                    0,
                    0
                ],
                [
                    0,
                    0,
                    0
                ],
                [
                    0,
                    0,
                    0
                ]
            ],
            turn: Sign.Cross,
            gameover: false
        };
        var _this = this;
        _class_call_check(this, Game);
        _define_property(this, "state", void 0);
        this.state = state;
        // Adicionar ouvintes de evento de clique às células quando a instância do jogo é criada
        for(var i = 0; i < 3; i++)_loop(i);
    }
    _create_class(Game, [
        {
            key: "addSign",
            value: function addSign(column, row, sign) {
                if (this.state.gameover) return;
                if (this.state.fields[column][row] > 0) return;
                this.state.fields[column][row] = sign;
                this.state.turn = sign === Sign.Circle ? Sign.Cross : Sign.Circle;
                return --this.state.count;
            }
        },
        {
            key: "verifyGameover",
            value: function verifyGameover() {
                if (this.state.count === 0) {
                    this.state.gameover = true;
                    return true;
                }
                for(var i = 0; i < this.state.fields.length; i++){
                    if (this.state.fields[i][0] && this.state.fields[i][0] === this.state.fields[i][1] && this.state.fields[i][1] === this.state.fields[i][2] || this.state.fields[0][i] && this.state.fields[0][i] === this.state.fields[1][i] && this.state.fields[1][i] === this.state.fields[2][i]) {
                        this.state.gameover = true;
                        return true;
                    }
                    if (this.state.fields[0][0] && this.state.fields[0][0] === this.state.fields[1][1] && this.state.fields[1][1] === this.state.fields[2][2] || this.state.fields[0][2] && this.state.fields[0][2] === this.state.fields[1][1] && this.state.fields[1][1] === this.state.fields[2][0]) {
                        this.state.gameover = true;
                        return true;
                    }
                }
                return false;
            }
        },
        {
            key: "resetGame",
            value: function resetGame() {
                // Limpar o estado do jogo e redefinir a grade
                this.state = {
                    count: 9,
                    fields: [
                        [
                            0,
                            0,
                            0
                        ],
                        [
                            0,
                            0,
                            0
                        ],
                        [
                            0,
                            0,
                            0
                        ]
                    ],
                    turn: Sign.Cross,
                    gameover: false
                };
                this.render();
            }
        },
        {
            key: "render",
            value: function render() {
                // Loop através das células da grade e atualize suas classes com base no estado do jogo
                for(var i = 0; i < 3; i++){
                    for(var j = 0; j < 3; j++){
                        var cell = cellElements[i][j];
                        var sign = this.state.fields[i][j];
                        // Limpar o conteúdo da célula
                        cell.innerHTML = "";
                        // Adicionar classe apropriada para representar "X" ou "O"
                        if (sign === Sign.Cross) {
                            cell.classList.add("cross");
                            cell.innerHTML = "❌"; // Emoji de X
                        } else if (sign === Sign.Circle) {
                            cell.classList.add("circle");
                            cell.innerHTML = "⭕"; // Emoji de O
                        }
                    }
                }
            }
        }
    ]);
    return Game;
}();
function showNotification(message) {
    var notification = document.getElementById("notification");
    notification.textContent = message;
    notification.style.display = "block";
}
function clearNotification() {
    var notification = document.getElementById("notification");
    notification.textContent = "";
    notification.style.display = "none";
}
// Criar uma nova instância da classe Game
var game = new Game();
// Chamar o método render para inicializar a grade
game.render();
