import { PropsWithChildren } from "react";
import c from "clsx";

import backdropCSSClasses from './backdrop.module.css'


interface ImageBackdropProps extends PropsWithChildren {
	imageSrc?: string;
}

const ImageBackdrop: React.FC<ImageBackdropProps> = ({
	imageSrc,
	children
}) => {
	const hasImage = typeof imageSrc === "string" && imageSrc.length > 0;

	const ImageTag = hasImage ? "img" : "div";
	const imageClassName = c("w-full h-full object-cover opacity-80", {
		[backdropCSSClasses.defaultMeshBackground]: !hasImage,
		"blur-[128px]": hasImage,
	});

	return (
		<div className="font-bold relative w-full h-screen bg-black text-white">
			<ImageTag
				src={hasImage ? imageSrc : undefined}
				className={imageClassName}
				alt="Backdrop"
			/>
			<div className="absolute top-0 left-0 w-full h-full">
				{children}
			</div>
		</div>
	);
};

export default ImageBackdrop;

export type { ImageBackdropProps };
