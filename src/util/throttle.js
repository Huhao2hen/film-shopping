export function throttle(func, time = 500) {
	let lastTime = 0
	let timer = null
	return function (...args) {
		const nowTime = Date.now()
		const remainTime = time - (nowTime - lastTime)
		clearTimeout(timer)
		if (remainTime <= 0) {
			lastTime = Date.now()
			return func.apply(this, args)
		} else {
			timer = setTimeout(function () {
				return func.apply(this, args)
			}, time)
		}
	}
}
