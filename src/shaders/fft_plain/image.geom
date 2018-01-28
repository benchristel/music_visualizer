layout(triangle_strip, max_vertices=6) out;

void quadAtPoint(vec2 p, vec2 size, float th) {
	vec4 P = vec4(p,0.,1.);
	vec2 q1 = size;
	vec2 q2 = vec2(size.x, -size.y);
	gl_Position = P - .5 * vec4(q1, 0., 0.);
	EmitVertex();
	gl_Position = P + .5 * vec4(q2, 0., 0.);
	EmitVertex();
	gl_Position = P + .5 * vec4(q1, 0., 0.);
	EmitVertex();
	EndPrimitive();

	gl_Position = P - .5 * vec4(q1, 0., 0.);
	EmitVertex();
	gl_Position = P + .5 * vec4(q1, 0., 0.);
	EmitVertex();
	gl_Position = P - .5 * vec4(q2, 0., 0.);
	EmitVertex();
	EndPrimitive();
}

void main() {
	// Output a fullscreen quad
	vec2 point = vec2(.5);
	point = point * 2. - 1.;
	quadAtPoint(point, vec2(2.), 0.);
}