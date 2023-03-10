import { PropsWithChildren } from "react";

interface ImageBackdropProps extends PropsWithChildren {
	imageSrc: string;
}

const ImageBackdrop: React.FC<ImageBackdropProps> = ({
	imageSrc,
	children
}) => {
	return (
		<div className="text-white bg-black font-bold relative w-full h-screen">
			<img
				src={imageSrc}
				className="blur-[128px] w-full h-full object-cover opacity-80"
				alt="Backdrop"
			/>
			{children}
		</div>
	);
};

export default ImageBackdrop;

export type { ImageBackdropProps };
