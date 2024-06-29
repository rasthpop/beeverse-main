'use client'
import { IntroCarouselDApi } from "@/components/intro-carousel";

const items: IntroItem[] = [
  {
    title: "Fight bosses and collect their loot!",
    subtitle: "Fight and earn honey!",
    imageURL: "/intro/intro1.webp"
  },
  {
    title: "Increase your Alpha Rank!",
    subtitle: "Alpha ranks will allow you to receive unique rewards in the main release of the game!",
    imageURL: "/intro/intro2.webp"
  },
  {
    title: "Invite friends and earn bonuses together",
    subtitle: "Both you and your friend will receive honey.",
    imageURL: "/intro/intro3.webp"
  },
  {
    title: "Complete quests and earn rewards!",
    subtitle:"Quests will help you earn honey faster and climb up the leaderboard!",
    imageURL: "/intro/intro4.webp"
  },
];

export default function Page() {
  return (
    <main className="grow w-full h-full bg-[#322418] flex flex-col items-center justify-center pt-2 select-none z-60">
      <IntroCarouselDApi items={items} href='/play'/>
    </main>
  );
}
