export const range = (start, end) => {
	let newEnd = end;
	if (end < 1) {
		return;
	}
	return [...Array(newEnd).keys()].map((i) => i + start);
};
