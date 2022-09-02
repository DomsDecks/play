// Simple Fast Counter.
// https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
sfc32 = (a, b, c, d) => {
	return () => {
		a >>>= 0; b >>>= 0; c >>>= 0; d >>>= 0;
		var t = (a + b) | 0;
		a = b ^ b >>> 9;
		b = c + (c << 3) | 0;
		c = (c << 21 | c >>> 11);
		d = d + 1 | 0;
		t = t + d | 0;
		c = c + t | 0;
		return (t >>> 0) / 4294967296;
	}
}

// 32-bit seed with optional XOR value.
var seed = (Math.random() * 100000) ^ 0xDEADBEEF;
// Pad seed with Phi, Pi and E.
// https://en.wikipedia.org/wiki/Nothing-up-my-sleeve_number
var rand = sfc32(0x9E3779B9, 0x243F6A88, 0xB7E15162, seed);
for (let i = 0; i < 15; i++) {
	rand();
}