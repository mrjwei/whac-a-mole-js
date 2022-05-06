const { ScoreBoard } = require("./score-board")

customElements.define("score-board", ScoreBoard)

const scoreBoard = document.createElement("score-board")

document.querySelector("#score").appendChild(scoreBoard)

exports.Mole = class extends HTMLElement {
  constructor() {
    super()

    this.timer = null
    this.interval = null

    this.actionIntervalMs = 2000 + Math.random() * 3000
    this.disappearAfterMs = 2000

    this.attachShadow({mode: "open"})

    this.mole = document.createElement("div")
    this.mole.setAttribute("class", "mole")
    this.mole.addEventListener("click", this.handleClick.bind(this))
    this.mole.addEventListener("mousedown", this.handleMouseDown.bind(this))

    const style = document.createElement("style")
    style.textContent = `
      .mole {
        width: 30px;
        height: 80px;
        background-color: green;
        position: absolute;
        bottom: -100%;
        left: 50%;
        transform: translateX(-50%);
        transition: all 0.1s ease-in;
      }
    `
    this.shadowRoot.append(style, this.mole)
  }
  appear() {
    this.mole.style.bottom = 0
  }

  disappear() {
    this.mole.style.bottom = "-100%"
  }

  start() {
    this.interval = setInterval(() => {
      this.appear.bind(this)()
      this.timer = setTimeout(() => {
        this.disappear.bind(this)()
      }, this.disappearAfterMs)
    }, this.actionIntervalMs)
  }

  end() {
    clearTimeout(this.timer)
    clearInterval(this.interval)
    this.timer = null
    this.interval = null
  }

  handleMouseDown(event) {
    this.mole.style.cursor = 'url("./portrait.png") 25 25, auto'
  }

  handleClick(event) {
    this.end()
    this.disappear()
    this.start()

    scoreBoard.increment()
  }
}