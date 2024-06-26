'use client'

import * as React from "react"
import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel"
import { useRouter } from "next/navigation";

export function IntroCarouselDApi(
  props: {
    items: IntroItem[];
	href: string;
  }
) {
  const items = props.items;

  const router = useRouter();
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return
    }
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    })
  }, [api])

  return (
    <div className="grow w-full overflow-hidden">
      <Carousel setApi={setApi} className="w-full h-full">
        <CarouselContent className="h-full z-10">
          {items.map((item, index) => (
            <CarouselItem key={index} className="h-full flex flex-col items-center justify-center">
              <div className="min-h-32 flex flex-col gap-2 items-center justify-start px-4">
                <div className="h-16 inline-flex items-start justify-center">
                  <h1 className="text-xl text-foreground font-semibold text-center">{item.title}</h1>
                </div>
                { item.subtitle && (
                  <div className="h-12 inline-flex items-start justify-center">
                    <p className="text-sm text-hint font-semibold text-center">{item.subtitle}</p>
                  </div>
                ) }
              </div>
              <div className="grow w-full rounded-2xl px-8 relative overflow-hidden pt-10">
                <div className="grow w-full h-2/3 bg-gradient-to-t from-black from-30% via-transparent via-70% to-transparent to-100% absolute left-0 bottom-0 z-20"></div>
                <div className="grow bg-gradient-to-t from-gradient-b to-gradient-a shadow-primary rounded-t-2xl pt-1.5 px-1.5 overflow-hidden">
                  <Image
                  src={item.imageURL}
                  alt={`preview-${index}`}
                  width={512}
                  height={512}
                  className="w-full h-full rounded-t-md object-contain"
                  priority
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
		<div className="relative w-full">
			<CarouselNext
			variant={'default'}
			className={`w-12 h-12 ${items.length === 1 && "left-1/2 -translate-x-1/2 z-[999]"}`}
			onMouseDown={() => router.push(props.href)}
			/>
			{
				items.length > 1 && (
					<div className="w-24 h-12 inline-flex gap-2 items-center justify-center absolute bottom-12 left-1/2 -translate-x-1/2 z-[999]">
						<SlideIcon isActive={current === 1} />
						<SlideIcon isActive={current === 2} />
						<SlideIcon isActive={current === 3} />
						<SlideIcon isActive={current === 4} />
					</div>
				)
			}
		</div>
      </Carousel>
    </div>
  )
}

function SlideIcon(
  props: {
    isActive: boolean;
  }
) {
  return(
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} className={`${props.isActive ? "text-primary fill-primary" : "text-transparent fill-white/30"} transition-all`}>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}
