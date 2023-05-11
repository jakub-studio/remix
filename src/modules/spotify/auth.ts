import config from "@/config";

const clientId = config.SPOTIFY_APP_CLIENT_ID;
const redirectUri = "http://localhost:8080"; // @TODO Change me

function generateRandomString(length: number) {
	let text = "";
	let possible =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for (let i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}

let codeVerifier = generateRandomString(128);

async function generateCodeChallenge(codeVerifier: string) {
	function base64encode(string: any) {
		return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
			.replace(/\+/g, "-")
			.replace(/\//g, "_")
			.replace(/=+$/, "");
	}

	const encoder = new TextEncoder();
	const data = encoder.encode(codeVerifier);
	const digest = await window.crypto.subtle.digest("SHA-256", data);

	return base64encode(digest);
}

export const authenticate = () => {
	generateCodeChallenge(codeVerifier).then(codeChallenge => {
		let state = generateRandomString(16);
		let scope = "user-read-private user-read-email"; // @TODO Change me
	
		localStorage.setItem("code_verifier", codeVerifier);
	
		let args = new URLSearchParams({
			response_type: "code",
			client_id: clientId,
			scope: scope,
			redirect_uri: redirectUri,
			state: state,
			code_challenge_method: "S256",
			code_challenge: codeChallenge
		});
	
		window.location = "https://accounts.spotify.com/authorize?" + args;
	});
}
