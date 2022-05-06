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