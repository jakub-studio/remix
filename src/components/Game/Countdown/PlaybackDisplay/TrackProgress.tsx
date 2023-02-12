interface TrackProgressProps {
	progress: number; // between 0 and 1 (100%)
}

const TrackProgress: React.FC<TrackProgressProps> = props => {
	const width = props.progress * 100 + "%";

	return (
		<div>
			<div style={{ width }}></div>
		</div>
	);
};

export default TrackProgress;
export type { TrackProgressProps };
