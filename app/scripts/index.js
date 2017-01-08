import './Imports/imports'

import DocReady from 'es6-docready'
import Scene from './Objects/Scene'
import Tracking from './Objects/Tracking'

DocReady(() => {
  let scene = new Scene(document.getElementById('scene')),
      tracking = new Tracking(scene),
      videoState = false

  tracking.createVideo()

  let interval = setInterval(() => {
    videoState = tracking.getVideoState()

    if (videoState) {
      tracking.startTracking()
      clearInterval(interval)
    }
  }, 200)
})
