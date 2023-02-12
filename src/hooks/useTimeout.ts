import { useRef, useEffect } from "react";

// typed version of the following:
// https://www.joshwcomeau.com/snippets/react-hooks/use-timeout/

export default function useTimeout(callback: () => void, delayMs: number) {
	const timeoutRef = useRef<number | null>(null);
	const savedCallback = useRef(callback);

	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	useEffect(() => {
		const tick = () => savedCallback.current();
		if (typeof delayMs === "number") {
			timeoutRef.current = window.setTimeout(tick, delayMs);
			return () => window.clearTimeout(timeoutRef.current as number);
		}
	}, [delayMs]);

	return timeoutRef;
}
