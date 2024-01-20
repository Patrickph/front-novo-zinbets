import Link from "next/link";
import Image from "next/image";
interface Game {
  name: string;
  key: number;
  href: string;
  src: string;
  active?: boolean;
}
export default function GameCard({
  game,
  provider,
}: {
  game: Game;
  provider: string;
}) {
  return (
    <Link href={game.href}>
      <div className="lg:p-5   p-2 bg-glass hover:bg-[#8845fa] duration-300">
        <div className="group w-full h-full  min-w-[100px] min-h-[150px] lg:min-h-[200px] relative rounded-2xl overflow-hidden object-cover ">
          <Image
            src={game.src}
            alt={game.name}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className=" justify-start ml-2 mt-2 lg:mt-4  text-[#E6E2FA] flex items-end ">
          {game.active == false ? (
            <div>
              <h1 className="font-bold text-xs lg:text-base truncate ">
                Em breve
              </h1>
            </div>
          ) : (
            <div>
              <h1 className="font-bold max-w-[110px] text-xs lg:text-base truncate">
                {game.name}
              </h1>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
