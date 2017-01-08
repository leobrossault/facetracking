import clm from '../vendors/clmtrackr'
import pModel from '../vendors/model_pca_10_svm'

class Tracking {
  constructor (scene) {
    this.video = false
    this.ctracker = false
    this.positions = false
    this.videoState = false
    this.scene = scene
  }

  createVideo () {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia

    if (navigator.getUserMedia) {
      navigator.getUserMedia({ audio: false, video: { width: window.innerWidth, height: window.innerHeight } },
        (stream) => {
          this.video = document.querySelector('video')

          this.video.width = window.innerWidth
          this.video.height = window.innerHeight

          this.video.srcObject = stream
          this.video.onloadedmetadata = () => {
            this.video.play()
            this.videoState = true
          }
        },
        (err) => {
          console.log('The following error occurred: ' + err.name);
        }
      )
    } else {
       console.log('getUserMedia not supported');
    }
  }

  getVideoState () {
    return this.videoState
  }

  startTracking () {
    this.ctracker = new clm.tracker()
    this.ctracker.init(pModel)
    this.ctracker.start(this.video)

    this.calcPos()
  }

  calcPos () {
    this.positions = this.ctracker.getCurrentPosition()

    if (this.positions) {
      let eyesPos = {
        'left': this.positions[27],
        'right': this.positions[28]
      }

      this.scene.drawEyes(eyesPos)
    }

    window.requestAnimationFrame(this.calcPos.bind(this))
  }
}

module.exports = Tracking
