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