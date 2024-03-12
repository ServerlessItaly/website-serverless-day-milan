import logoServerlessDark from "../assets/sponsors/logo serverless dark.svg";
import logoServerlessLight from "../assets/sponsors/serverless-guru-logo.svg";
import logoBeSharp from "../assets/sponsors/logo_besharp.svg";

// import { cn } from "@/lib/utils";
import { InfiniteMovingImage } from "./ui/infinite-moving-cards";

const Sponsors = () => {
	const testimonials = [
		logoBeSharp,
		logoServerlessDark,
		logoServerlessLight,
		logoBeSharp,
		logoServerlessDark,
		logoServerlessLight,
	];
	return (
		<div className="pt-3 mb-10 text-center bg-transparent lg:mb-0">
			<h5 className="mb-2 text-sm font-semibold text-gray-300">Sponsors</h5>
			{/* <h2 className="text-2xl font-semibold text-white ">Headline</h2> *2024 edition sponsors/}
			{/* <div className="flex flex-wrap justify-center ">
				<SponsorCard logo={logoServerlessDark} />
				<SponsorCard logo={logoServerlessLight} />
				<SponsorCard logo={logoBeSharp} imgClassName="w-60" />
			</div> */}
			{/* <hr className="my-5 border-t-2 border-gray-300" /> */}
			{/* <h2 className="text-xl font-semibold text-white">Gold</h2> */}
			<div className=" rounded-md flex flex-col antialiased dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
				<InfiniteMovingImage items={testimonials} direction="right" speed="slow" />
			</div>
			{/* <hr className="my-5 border-t-2 border-gray-300" />
			<h2 className="text-lg font-semibold text-white">Partner</h2>
			<h2 className="text-base font-semibold text-white">Community</h2> */}
		</div>
	);
};

export default Sponsors;

// const SponsorCard = ({
// 	logo,
// 	cardClassName,
// 	imgClassName,
// }: {
// 	logo: string;
// 	cardClassName?: string;
// 	imgClassName?: string;
// }) => {
// 	return (
// 		<div className={cn(" p-3 rounded-xl items-center flex", cardClassName)}>
// 			<img src={logo} alt="logo" className={cn("w-80", imgClassName)} />
// 		</div>
// 	);
// };