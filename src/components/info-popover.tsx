import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

export default function InfoPopover(
	props: {
		content: string;
	}
) {
	
	return(
		<Popover>
			<PopoverTrigger asChild>
				<svg width="18" height="18" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
					<g opacity="0.5">
					<circle cx="6.5" cy="6.5" r="6.5" fill="#D9D9D9"/>
					<path d="M6.54302 5.40625C6.2175 5.40625 5.94927 5.32943 5.73833 5.17578C5.5274 5.02214 5.42193 4.80078 5.42193 4.51172C5.42193 4.22266 5.5274 4.00391 5.73833 3.85547C5.94927 3.70703 6.22011 3.63281 6.55083 3.63281C6.88156 3.63281 7.14979 3.70573 7.35552 3.85156C7.56386 3.9974 7.66802 4.21745 7.66802 4.51172C7.66802 4.80078 7.56125 5.02214 7.34771 5.17578C7.13677 5.32943 6.86854 5.40625 6.54302 5.40625ZM7.98052 8.82422V10H5.10162V8.82422H5.60552V7.02344H5.10162V6.0625L7.47662 5.81641V8.82422H7.98052Z" fill="#464646"/>
					</g>
				</svg>
			</PopoverTrigger>
			<PopoverContent>
				<p className="text-sm text-foreground font-medium">{props.content}</p>
			</PopoverContent>
		</Popover>
	)
}
