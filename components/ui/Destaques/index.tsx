import { BadgeCheck } from "lucide-react"

export default function Destaques() {
  const items = [
    {
      icon: <BadgeCheck />,
      name: "Tiger",
      href: "/",
    },
    {
      icon: <BadgeCheck />,
      name: "Mines",
      href: "/",
    },
    {
      icon: <BadgeCheck />,
      name: "Crash",
      href: "/",
    },
    {
      icon: <BadgeCheck />,
      name: "Slots",
      href: "/",
    },
  ]
  return (
    <div className="flex  items-center  gap-16">
      {items.map((destaque, index) => {
        return (
          <div
            key={index}
            className="flex hover:opacity-80 cursor-pointer flex-col items-center"
          >
            <div className=" w-14 h-14 flex items-center justify-center rounded-2xl bg-[rgb(0,144,255)] bg-opacity-50">
              {destaque.icon}
            </div>
            <h1 className="font-bold text-sm mt-2">{destaque.name}</h1>
          </div>
        )
      })}
    </div>
  )
}
