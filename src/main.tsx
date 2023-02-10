import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { prepareSpotifyWebPlaybackSDKReadyCallback } from "./modules/spotify";
import "./tailwind.css";

prepareSpotifyWebPlaybackSDKReadyCallback();

const debugKey = "debug";

if (localStorage.getItem(debugKey) !== "*") {
	localStorage.setItem(debugKey, "*");
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
