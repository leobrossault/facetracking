class Scene {
  constructor (canvas) {
    this.canvas = canvas
    this.context = this.canvas.getContext('2d')
    this.width = window.innerWidth
    this.height = window.innerHeight

    this.canvas.width = this.width
    this.canvas.height = this.height

    this.radius = 5
    this.color = '#18a4f4'
  }

  drawEyes (pos) {
    this.context.clearRect(0, 0, this.width, this.height)

    for (let y = 0; y < 2; y++) {
      this.context.beginPath()

      if (y === 0) {
        this.context.arc(pos.left[0], pos.left[1], this.radius, 0, 2 * Math.PI, false)
      } else {
        this.context.arc(pos.right[0], pos.right[1], this.radius, 0, 2 * Math.PI, false)
      }

      this.context.fillStyle = this.color
      this.context.fill()
    }
  }
}

module.exports = Scene
