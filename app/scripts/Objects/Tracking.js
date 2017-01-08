import tracking from '../vendors/tracking'

class Tracking {
  constructor (scene) {
    this.video = false
    this.positions = false
    this.videoState = false
    this.scene = scene
  }

  createVideo () {
    this.FastTracker = () => {
      FastTracker.base(window, 'constructor')
    }

    console.log(this.FastTracker)

    tracking.inherits(this.FastTracker, tracking.Tracker)

    tracking.Fast.THRESHOLD = 2
    this.FastTracker.prototype.threshold = tracking.Fast.THRESHOLD

    this.FastTracker.prototype.track = (pixels, width, height) => {
      var gray = tracking.Image.grayscale(pixels, width, height)
      var corners = tracking.Fast.findCorners(gray, width, height)

      this.emit('track', {
        data: corners
      })
    }

    this.tracker = new FastTracker()

    this.tracker.on('track', (event) => {
      console.log(event.data)

    })

    tracking.track('#video', tracker, { camera: true })

  }

  getVideoState () {
    return this.videoState
  }

  startTracking () {

  }

  calcPos () {

    window.requestAnimationFrame(this.calcPos.bind(this))
  }
}

module.exports = Tracking
