vec4 fg = vec4(0,1,1,1);
vec4 bg = vec4(0);

vec4 color1 = vec4(0.7, 0, 0, 1);
vec4 color2 = vec4(0.5, 0, 0.5, 1);
vec4 color3 = vec4(0.1, 0.8, 0.3, 1);
vec4 color4 = vec4(0.9, 1, 0.5, 1);
vec4 color5 = vec4(0.9, 0.9, 0.8, 1);

float threshold1 = 0.010;
float threshold2 = 0.040;
float threshold3 = 0.1;
float threshold4 = 0.4;
float threshold5 = 0.8;
float threshold6 = 0.160;

float gain1 = 1;
float gain2 = 2;
float gain3 = 4;
float gain4 = 8;
float gain5 = 16;

float energy_in_band(sampler1D fft, float low, float high) {
    float energy = 0.;
    float d = (high - low) / 20;
    for (float x = low; x < high; x += d) {
        energy += texture(fft, x).r;
    }
    float samples = (high - low) / d;
    return energy / samples;
}

in vec2 geom_p;
out vec4 C;
void main() {
    float horiz_pixel = 1. / iRes.x;
    float vert_pixel = 1. / iRes.y;
    float flame_width = 20. * horiz_pixel;
	vec2 U = geom_p;
    C = bg;
	if (U.x >= 1 - flame_width) {
    	float pressure_left = texture(iSoundL, (U.x - (1 - flame_width)) / flame_width).r;
    	float freq1 = energy_in_band(iFreqL, 0, threshold1);
    	float freq2 = energy_in_band(iFreqL, threshold1, threshold2);
	    float freq3 = energy_in_band(iFreqL, threshold2, threshold3);
	    float freq4 = energy_in_band(iFreqL, threshold3, threshold4);
	    float freq5 = energy_in_band(iFreqL, threshold4, threshold5);
        if (abs(U.y - 0.5) < abs(pressure_left * freq1 * gain1)) {
            C = color1;
        }
        if (abs(U.y - 0.4) < abs(pressure_left * freq2 * gain2)) {
            C = color2;
        }
        if (abs(U.y - 0.3) < abs(pressure_left * freq3 * gain3)) {
            C = color3;
        }
        if (abs(U.y - 0.2) < abs(pressure_left * freq4 * gain4)) {
            C = color4;
        }
        if (abs(U.y - 0.1) < abs(pressure_left * freq5 * gain5)) {
            C = color5;
        }
//        if (abs(U.y - 0.5) < abs(pressure_left)) {
//            C += color3;
//        }
	} else {
	    C = texture(ia, U + vec2(flame_width, 0));
	    C = mix(C, texture(ia, U + vec2(flame_width + horiz_pixel, 0)), 0.50);
	    C = mix(C, texture(ia, U + vec2(flame_width + 2 * horiz_pixel, vert_pixel)), 0.50);
	    C = mix(C, texture(ia, U + vec2(flame_width + 2 * horiz_pixel, -vert_pixel)), 0.50);
	}
}
