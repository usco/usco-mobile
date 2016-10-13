import mat4 from 'gl-mat4'
import bunny from 'bunny'

const bunnyGeom = Object.assign({}, bunny, {id: '0'})

const bunnyData = {
  id: 'b0',
  geometry: bunnyGeom, // in truth I do not see cases where bounds would change independantly of geometry, but we might
  // have bounds WITHOUT geometry

  bounds: {
    dia: 40,
    min: [9, 10, 0],
    max: [15, 10, 4]
  },

  transforms: {
    pos: [5, 10, 0],
    rot: [Math.PI / 2, 0, 0],
    sca: [1, 1, 1]
  },

  visuals: {
    color: [0.02, 0.7, 1, 1], // 07a9ff [1, 1, 0, 0.5],
    type: 'mesh'
  },

  meta: {
    selected: false,
    pickable: true
  }

}

const bunnyData2 = {
  id: 'b1',
  geometry: bunnyGeom,
  transforms: {
    pos: [0, 0, 0],
    rot: [Math.PI/2, 0, 0],
    sca: [1, 1, -1]
  },

  visuals: {
    color: [0, 1, 1, 0.5],
    visible: true,
    type: 'mesh'
  },

  meta: {
    selected: false,
    pickable: true
  }
}

const bunnyData3 = {
  id: 'b2',
  geometry: bunnyGeom,
  transforms: {
    pos: [10, -12.989, 3],
    rot: [Math.PI/2, 0, 0],
    sca: [1, 1, 1]
  },
  visuals: {
    color: [1, 1, 0, 0.5],
    type: 'mesh'
  },

  meta: {
    selected: true,
    pickable: true
  }
}

const sceneData = {
  cameras: [
    {
      pos: [75, 75, 145], // [100,-100,100]
      up: [0, 0, 1],
      lens: {
        fov: 45,
        near: 0.1,
        far: 20000
      }
    }
  ],
  controls: [ // not in use !!! see orbitControls.js directly
    {
      up: [0, 0, 1],
      rotateSpeed: 0.2,
      panSpeed: 2.0,
      zoomSpeed: 2.0,
      autoRotate: {
        enabled: false,
        speed: 0.2
      },
      enabled: true
    }
  ],
  // lighting data
  lights: [
    {position: [100, 100, 200], color: [0.8, 0.6, 0.6], intensity: 0.4},
    {position: [-100, -200, 100], color: [0.75, 0.7, 0.7], intensity: 0.4},
    {position: [100, 200, -210], color: [0.9, 0.9, 0.9], intensity: 0.4},
    {position: [-100, -210, -200], color: [0.7, 0.7, 0.8], intensity: 0.4}
  ]
}

export { bunnyData, bunnyData2, bunnyData3, sceneData }
