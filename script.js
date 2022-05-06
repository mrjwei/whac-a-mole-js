class Mole {
  constructor(moleEl, actionIntervalMs, disappearAfterMs) {
    this.moleEl = moleEl
    this.moleEl.addEventListener("mousedown", this.handleMouseDown.bind(this))
    this.moleEl.addEventListener("click", this.handleClick.bind(this))
    this.actionIntervalMs = actionIntervalMs
    this.disappearAfterMs = disappearAfterMs
    this.interval = null
    this.timer = null
  }

  appear() {
    this.moleEl.style.bottom = 0
  }

  disappear() {
    this.moleEl.style.bottom = "-100%"
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
    this.moleEl.style.cursor = 'url("./portrait.png") 25 25, auto'
  }

  handleClick(event) {
    // cancle timer and make it disappear immediately
    this.end()
    this.disappear()
    this.start()
  }
}

const container = document.querySelector(".container")
// create holes and moles
Array.from({length: 9}).forEach(obj => {
  const unit = document.createElement("div")
  unit.classList.add("unit")
  const hole = document.createElement("div")
  hole.classList.add("hole")
  const mole = document.createElement("div")
  mole.classList.add("mole")
  hole.appendChild(mole)
  unit.appendChild(hole)
  container.appendChild(unit)
})

let moles = []
const moleEls = document.querySelectorAll(".mole")
moleEls.forEach(moleEl => {
  const mole = new Mole(moleEl, 2000 + Math.random() * 3000, 2000)
  mole.start()
  moles.push(mole)
})

let hidden, visibilityChange;
if (typeof document.hidden !== "undefined") {
  hidden = "hidden";
  visibilityChange = "visibilitychange";
} else if (typeof document.msHidden !== "undefined") {
  hidden = "msHidden";
  visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
  hidden = "webkitHidden";
  visibilityChange = "webkitvisibilitychange";
}

document.addEventListener(visibilityChange, () => {
  if (document[hidden]) {
    moles.forEach(mole => {
      mole.end()
    })
    } else {
      moles.forEach(mole => {
        if (mole.interval === null || mole.timer === null) {
          mole.interval = setInterval(() => {
            mole.appear()
            mole.timer = setTimeout(() => {
              mole.disappear()
            }, mole.disappearAfterMs)
          }, mole.actionIntervalMs)
        }
      })
    }
 })