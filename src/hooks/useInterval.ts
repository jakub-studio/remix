import { useRef, useEffect } from "react";

// typed version of the following:
// https://www.joshwcomeau.com/snippets/react-hooks/use-interval/

export default function useInterval(callback: () => void, delayMs: number) {
	const intervalRef = useRef<number | null>(null);
	const savedCallback = useRef(callback);

	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	useEffect(() => {
		const tick = () => savedCallback.current();

		if (typeof delayMs === "number") {
			intervalRef.current = window.setInterval(tick, delayMs);
			return () => window.clearInterval(intervalRef.current as number);
		}
	}, [delayMs]);

	return intervalRef;
}
