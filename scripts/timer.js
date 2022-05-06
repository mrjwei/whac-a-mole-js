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