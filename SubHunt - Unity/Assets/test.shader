Shader "Tutorial/Basic" {
    Properties {
        _Color ("Main Color phuck u", Color) = (1,0.5,0.5,1)
    }
    SubShader {
        Pass {
            Material {
                Diffuse [_Color]
            }
            Lighting On
        }
    }
}