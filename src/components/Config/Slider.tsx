import * as Slider from "@radix-ui/react-slider";

const SliderComponent = () => {
	return <Slider.Root>
	<Slider.Track>
		<Slider.Range />
	</Slider.Track>
	<Slider.Thumb />
</Slider.Root>
}

export default SliderComponent;