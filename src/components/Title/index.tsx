import useGame from "@/modules/state";
import background from "@/assets/background.jpeg";

const Title: React.FC = () => {
	const { gameTitle: title, gameSubTitle: subTitle } = useGame(
		s => s.config.strings
	);

	return (
		<div className="text-white bg-black font-bold relative w-full h-screen">
			<img src={background} className="blur-3xl w-full h-full object-cover" />
			<div className="absolute top-0 left-0 w-full h-full flex flex-col items-start justify-center pl-20">
				<h1 className="text-9xl mb-4">{title}</h1>
				<h2 className="text-4xl">{subTitle}</h2>
			</div>
		</div>
	);
};

export default Title;
