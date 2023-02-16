export function debounce(fun, time = 200) {
	let timer
	return function (...args) {
		if (timer) clearTimeout(timer)
		timer = setTimeout(() => {
			return fun.apply(this, args)
		}, time)
	}
}