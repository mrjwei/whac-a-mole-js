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