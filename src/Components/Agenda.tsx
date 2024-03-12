import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import slsTalk from "../assets/slsdaytalk.json";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
const IS_COMING_SOON = false;
const AgendaAccordion = () => {
	return (
		<div className="h-full pt-10 bg-white ">
			{/* <h1 className="mb-4 text-2xl font-bold text-center text-purple-800 uppercase">Agenda 2024</h1> */}

			<h1 className="mb-3 text-2xl font-extrabold tracking-widest text-center text-purple-800 uppercase lg:text-5xl md:text-4xl">
				Agenda 2024
			</h1>
			{IS_COMING_SOON && <ComingSoon />}
			{!IS_COMING_SOON && (
				<Accordion type="single" defaultValue="item-1" collapsible className="w-full md:p-10 lg:pb-10 lg:p-52 lg:pt-0">
					<AccordionItem value="item-1" className="rounded-lg ">
						<AccordionTrigger className="p-2 text-2xl font-bold text-purple-900 no-underline min-h-16 hover:no-underline">
							🚀 Main stage
						</AccordionTrigger>
						<AccordionContent>
							<Agenda talks={slsTalk as AgendaItem[]} />
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-2" className="mt-4 rounded-lg ">
						<AccordionTrigger className="p-2 text-2xl font-bold text-purple-900 no-underline hover:no-underline min-h-16">
							💬 Community Track
						</AccordionTrigger>
						<AccordionContent>
							<Agenda talks={slsTalk as AgendaItem[]} />
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			)}
		</div>
	);
};
export default AgendaAccordion;

const ComingSoon = () => {
	// use framer motion to animate text like "coming soon", "coming soon.", "coming soon..", "coming soon...

	const [animationText, setAnimationText] = useState("coming soon");

	useEffect(() => {
		const interval = setInterval(() => {
			setAnimationText((prevText) => {
				if (prevText === "coming soon...") {
					return "coming soon";
				} else {
					return prevText + ".";
				}
			});
		}, 500);

		return () => {
			clearInterval(interval);
		};
	}, []);

	return (
		<div className="p-10">
			<motion.p className="text-2xl font-medium text-center text-blue-900">{animationText}</motion.p>
		</div>
	);
};

const Agenda = ({ talks }: { talks: AgendaItem[] }) => {
	return (
		<div className="w-full">
			<Accordion type="single" collapsible className="w-full ">
				{talks.map((talk, index) => (
					<TalkCard key={index} talk={talk} index={index} />
				))}
			</Accordion>
		</div>
	);
};

const TalkCard = ({ talk: agendaTalk, index }: { talk: AgendaItem; index: number }) => {
	if (!agendaTalk || !agendaTalk.agenda_details.type === undefined) return null;

	const getTimestamp = (time: string) => {
		const hours = new Date(time).getHours();
		const minutes = new Date(time).getMinutes();
		return `${hours}:${minutes}0`;
	};

	const title = agendaTalk?.talk?.title || agendaTalk?.break?.title;
	const description = agendaTalk?.talk?.description || agendaTalk?.break?.inline_abstract;
	const name = agendaTalk?.talk?.name || "";
	const duration = agendaTalk?.agenda_details.minutes || 0;
	const profileImg = agendaTalk?.talk?.avatar || "";
	const talkType = agendaTalk.agenda_details.type;

	// console.log({ agendaTalk });

	// Calculate the height of the item on the agenda based on the duration provided,
	//the max height is capped to 110px,
	const calculateItemHeight = (minutes: number) => {
		const height = minutes * 1.5;
		if (height > 170) return 110;
		return height;
	};

	return (
		<div
			id="talk"
			className={`border-t-[1px]  border-l-0 border-r-0 border-[#5d518488] flex items-start p-2  ${
				agendaTalk.agenda_details.type === "talk" ? "" : "bg-gradient-to-br from-pink-50 to-purple-100"
			}`}
			style={{ minHeight: `${calculateItemHeight(duration)}px` }}
		>
			<div id="talk-details" className="flex items-center w-full h-full gap-2 p-1 my-auto ">
				<div
					id="time-container"
					className="w-16 flex md:w-24 h-full   border-slate-200 md:border-r-[#73468433] md:border-r-[1px]"
				>
					<p className="flex w-full my-auto font-light">
						{getTimestamp(agendaTalk.agenda_details.start_time)} <span className="hidden md:block">&nbsp;-&nbsp;</span>
						{getTimestamp(agendaTalk.agenda_details.end_time)}
					</p>
					{/* <span>({agendaTalk.agenda_details.minutes} mins)</span> */}
				</div>
				<div id="talk-content" className="w-full ">
					<AccordionItem className="border-0 " value={index + agendaTalk.agenda_details.start_time}>
						<AccordionTrigger
							className={`flex justify-start text-start my-auto text-xs md:text-base ${
								talkType === "break" ? "text-purple-900" : ""
							}`}
						>
							{title}
						</AccordionTrigger>
						<AccordionContent className="text-start">
							<div id="talk-description">
								<p>{description}</p>
								{talkType === "talk" && (
									<p className="pt-2 text-gray-600">
										By&nbsp;
										<a href={agendaTalk.talk?.url} target="_blank" className="underline underline-offset-2">
											{name}
										</a>
									</p>
								)}
							</div>
						</AccordionContent>
					</AccordionItem>
				</div>
				<div id="participants" className="w-20">
					{profileImg && (
						<a href={agendaTalk.talk?.url || "#"} className="" target="_blank">
							{/* <AnimatedTooltip items={talkers} /> */}
							<img
								className="object-cover w-10 h-10 rounded-full "
								src={profileImg}
								height={100}
								width={100}
								alt={name}
								title={name}
								loading="lazy"
							/>
						</a>
					)}
					{!profileImg && <p className="">{name}</p>}
				</div>
			</div>
		</div>
	);
};

// use the json schema from the file and create a type

interface AgendaDetails {
	start_time: string;
	end_time: string;
	minutes: number;
	type: "talk" | "break";
}

interface Talk {
	title: string;
	description: string;
	name: string;
	avatar: string;
	url: string;
	organization: string;
}

interface Break {
	title: string;
	inline_abstract: string;
}

interface AgendaItem {
	agenda_details: AgendaDetails;
	talk?: Talk;
	break?: Break;
}