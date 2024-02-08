"use client"
import { useModal } from "@/contexts/ModalContext"
import { ArrowRightOnRectangleIcon } from "@heroicons/react/20/solid"
import { useEffect } from "react"

export default function SignIn() {
  const { setOpenModal } = useModal()

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search)
    if (urlSearchParams.has("ref")) {
      setOpenModal("register")
    }
  }, [])

  return (
    <div className="h-11 flex gap-4 items-center">
      <div
        onClick={() => setOpenModal("login")}
        className="text-white-500 hover:text-white/70 text-sm cursor-pointer"
      >
        Entrar
      </div>


      <div
        onClick={() => setOpenModal("register")}
        className="h-11 items-center cursor-pointer rounded-2xl flex gap-1  text-white-500 bg-[#8845fa] hover:bg-[#713ad6] px-3 py-2 text-center text-sm"
      >
        Cadastre-se
      </div>
    </div>
  )
}
