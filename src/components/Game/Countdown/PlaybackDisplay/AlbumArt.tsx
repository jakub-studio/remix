import { CSSProperties, PropsWithChildren } from "react";
import { motion } from "framer-motion";
import c from "clsx";

interface AlbumArtProps extends PropsWithChildren {
	albumArtUrl: string;
	flip: boolean;
}

const albumArtFaceClassName = "absolute w-full h-full";
const backfaceHidden: CSSProperties = { backfaceVisibility: "hidden" };
const albumArtSize = "512px";

const AlbumArt: React.FC<AlbumArtProps> = ({ albumArtUrl, flip, children }) => {
	return (
		<div
			className="relative"
			style={{ width: albumArtSize, height: albumArtSize }}
		>
			{/* Front face of the album */}
			<motion.div
				initial={false}
				animate={{
					rotateY: flip ? 180 : 0,
					rotateZ: flip ? 50 : 0
				}}
				className={c(albumArtFaceClassName)}
				style={backfaceHidden}
			>
				<img src={albumArtUrl} alt="Album art" />
			</motion.div>

			{/* Back face of the album */}
			<motion.div
				initial={false}
				animate={{
					rotateY: flip ? 0 : 180,
					rotateZ: flip ? 0 : 50
				}}
				className={c(
					albumArtFaceClassName,
					"flex justify-center items-center bg-neutral-900 text-neutral-100 font-bold text-3xl"
				)}
				style={backfaceHidden}
			>
				{children}
			</motion.div>
		</div>
	);
};

export default AlbumArt;
