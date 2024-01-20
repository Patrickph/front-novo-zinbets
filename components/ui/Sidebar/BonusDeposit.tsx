"use client"
import { useModal } from "@/contexts/ModalContext"
import Image from "next/image"

export default function BonusDeposit() {
  const { setOpenModal } = useModal()

  return (
    <div
      onClick={() => setOpenModal("deposit")}
      className="cursor-pointer flex h-10 items-center justify-center bg-[#8845fa] hover:bg-[#713ad6] text-white rounded-2xl p-2 text-center font-bold text-sm"
    >
      <Image
        src={`/${process.env.NEXT_PUBLIC_SITE_NAME}/dollar.png`}
        width={24}
        height={31}
        alt=""
      />
      Ganhe R$10 grátis
    </div>
  )
}
