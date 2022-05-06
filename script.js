let score = 0
const scoreEl = document.querySelector("#score")
scoreEl.textContent = score

class Mole extends HTMLElement {
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

    score += 10
    scoreEl.textContent = score
  }
}

customElements.define("mole-element", Mole)

class Hole extends HTMLElement {
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

customElements.define("hole-element", Hole)

class Unit extends HTMLElement {
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