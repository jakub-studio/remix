import { useSpotify } from "./modules/spotify";
import background from "@/assets/background.jpeg"

function App() {
	const player = useSpotify(p => p.player);

	return (
		<div>
			<h1>Remix</h1>
			<hr/>
			<span>
				<div>
					<img width={500} src={background} />
				</div>
				<div>
					<h2>Track Name</h2>
					<h3>Artist Name</h3>
				</div>
			</span>
			<button>Play Track</button>
		</div>
	);
}

export default App;
