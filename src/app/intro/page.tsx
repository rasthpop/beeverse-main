import { IntroCarouselDApi } from "@/components/intro-carousel";

const items: IntroItem[] = [
  {
    title: "Кликайте на экран и зарабатывайте мёд!",
    subtitle: "Вы можете использовать бусты и хитрые стратегии",
    imageURL: "/intro/1.webp"
  },
  {
    title: "Улучшайте свою пасеку!",
    subtitle: "Используйте карточки, чтобы увеличить свой пассивный доход",
    imageURL: "/intro/2.webp"
  },
  {
    title: "Приглашайте друзей и получайте бонусы вместе",
    subtitle: "Мёд получите и вы, и ваш друг",
    imageURL: "/intro/3.webp"
  },
  {
    title: "Выполняйте задания и получайте вознаграждения!",
    imageURL: "/intro/4.webp"
  },
];

export default function Page() {
  return (
    <main className="grow w-full h-full bg-black flex flex-col items-center justify-center pt-10 select-none z-40">
      <IntroCarouselDApi items={items} href='/play'/>
    </main>
  );
}
