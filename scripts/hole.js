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