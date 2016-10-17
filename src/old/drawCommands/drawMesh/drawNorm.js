var glslify = require('glslify-sync') // works in client & server

export default function drawNormal (regl, params) {
  const {fbo, SHADOW_RES} = params
   return regl({
    uniforms: {
      shadowMap: fbo,
      minBias: () => 0.005,
      maxBias: () => 0.03,
      shadowColor: [1,1,1]
    },
    frag: `
    precision mediump float;
    varying vec3 vNormal;
    varying vec3 vShadowCoord;
    uniform float ambientLightAmount;
    uniform float diffuseLightAmount;
    uniform vec4 color;
    uniform sampler2D shadowMap;
    uniform vec3 lightDir;
    uniform float minBias;
    uniform float maxBias;
    uniform vec3 shadowColor;
    uniform vec3 opactity;

    #define texelSize 1.0 / float(${SHADOW_RES})

    float shadowSample(vec2 co, float z, float bias) {
      float a = texture2D(shadowMap, co).z;
      float b = vShadowCoord.z;
      return step(b-bias, a);
    }
    void main () {
      vec3 ambient = ambientLightAmount * color.rgb;
      float cosTheta = dot(vNormal, lightDir);
      vec3 diffuse = diffuseLightAmount * color.rgb * clamp(cosTheta , 0.0, 1.0 );

      float v = 1.0; // shadow value
      vec2 co = vShadowCoord.xy * 0.5 + 0.5;// go from range [-1,+1] to range [0,+1]
      // counteract shadow acne.
      float bias = max(maxBias * (1.0 - cosTheta), minBias);
      float v0 = shadowSample(co + texelSize * vec2(0.0, 0.0), vShadowCoord.z, bias);
      float v1 = shadowSample(co + texelSize * vec2(1.0, 0.0), vShadowCoord.z, bias);
      float v2 = shadowSample(co + texelSize * vec2(0.0, 1.0), vShadowCoord.z, bias);
      float v3 = shadowSample(co + texelSize * vec2(1.0, 1.0), vShadowCoord.z, bias);
      // PCF filtering
      v = (v0 + v1 + v2 + v3) * (1.0 / 4.0);
      // if outside light frustum, render now shadow.
      // If WebGL had GL_CLAMP_TO_BORDER we would not have to do this,
      // but that is unfortunately not the case...
      if(co.x < 0.0 || co.x > 1.0 || co.y < 0.0 || co.y > 1.0) {
        v = 1.0;
      }
      gl_FragColor = vec4((ambient + diffuse * v), 1.);// color.w);//1.-shadowColor.x
    }`,
    vert: glslify(__dirname + '/shaders/shadowed.vert')
  })
}
