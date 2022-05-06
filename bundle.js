(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
exports.Hole = class extends HTMLElement {
  constructor() {
    super()

    this.attachShadow({mode: 'open'})

    const hole = document.createElement("div")
    hole.setAttribute("class", "hole")

    const style = document.createElement("style")
    style.textContent = `
      .hole {
        height: 50px;
        background-color: black;
        border-radius: 50%;
      }
    `
    this.shadowRoot.append(style, hole)
  }
}
},{}],2:[function(require,module,exports){
const {Timer} = require("./timer")
const {Mole} = require("./mole")
const {Hole} = require("./hole")
const {Unit} = require("./unit")

customElements.define("timer-element", Timer)

const timer = document.createElement("timer-element")

document.querySelector("#seconds").appendChild(timer)

customElements.define("mole-element", Mole)

customElements.define("hole-element", Hole)

customElements.define("unit-element", Unit)

let units = []

Array.from({length: 9}).forEach(i => {
  const unit = document.createElement("unit-element")
  units.push(unit)
})
document.querySelector("#units").append(...units)

units.map(unit => unit.mole).forEach(mole => {
  if (mole.interval === null || mole.timer === null) {
    mole.interval = setInterval(() => {
      mole.appear()
      mole.timer = setTimeout(() => {
        mole.disappear()
      }, mole.disappearAfterMs)
    }, mole.actionIntervalMs)
  }
})
},{"./hole":1,"./mole":3,"./timer":5,"./unit":6}],3:[function(require,module,exports){
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
},{"./score-board":4}],4:[function(require,module,exports){
exports.ScoreBoard = class extends HTMLElement {
  constructor() {
    super()

    this.score = 0

    this.attachShadow({mode: "open"})

    this.span = document.createElement("span")
    this.span.textContent = this.score
    const style = document.createElement("style")
    style.textContent = ``
    this.shadowRoot.append(style, this.span)
  }

  increment() {
    this.score += 10
    this.span.textContent = this.score
  }
}
},{}],5:[function(require,module,exports){
exports.Timer = class extends HTMLElement {
  constructor() {
    super()

    this.seconds = 30

    this.attachShadow({mode: "open"})

    this.span = document.createElement("span")
    this.span.textContent = this.seconds
    const style = document.createElement("style")
    style.textContent = ``
    this.shadowRoot.append(style, this.span)

    this.interval = setInterval(() => {
      if (this.seconds === 0) {
        clearInterval(this.interval)
        return
      }
      this.seconds -= 1
      this.span.textContent = this.seconds
    }, 1000)
  }
}
},{}],6:[function(require,module,exports){
exports.Unit = class extends HTMLElement {
  constructor() {
    super()

    this.attachShadow({mode: 'open'})

    this.mole = document.createElement("mole-element")
    const hole = document.createElement("hole-element")

    const unit = document.createElement("div")
    unit.setAttribute("class", "unit")
    const style = document.createElement("style")
    style.textContent = `
      .unit {
        width: 100px;
        height: 100px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        overflow-y: hidden;
        position: relative;
      }
    `
    unit.append(hole, this.mole)
    this.shadowRoot.append(style, unit)
  }
}
},{}]},{},[2]);
