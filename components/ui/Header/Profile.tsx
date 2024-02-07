"use client";
import { useModal } from "@/contexts/ModalContext";
import BalanceProfile from "./BalanceProfile";
import UserMenu from "./UserMenu";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/20/solid";
import { useEffect } from "react";

export default function Profile() {
  const { setOpenModal } = useModal();
  const { isLogged } = useAuth();

  const bgGradient = {
    background:
      "linear-gradient(to bottom, rgb(47 184 255), rgb(47 104 255))!important",
  };

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);

    if (urlSearchParams.has("ref")) {
      setOpenModal("register");
    }
  }, []);

  return (
    <>
      {isLogged ? (
        <div className="flex gap-2 items-center">
          <div
            onClick={() => setOpenModal("deposit")}
            className="h-10 flex first:items-center cursor-pointer md:mx-2 rounded shadow-green shadow-green-500 bg-green-500 text-zinc-900 hover:bg-green-700 px-2 py-2 text-center font-bold text-xs md:text-sm"
          >
            Depositar
          </div>

          <BalanceProfile />
          <UserMenu />
        </div>
      ) : (
        <div className="h-11 flex gap-4 items-center">
          <div
            onClick={() => setOpenModal("login")}
            className="font-bold hover:text-white/70 text-sm cursor-pointer"
          >
            Entrar
          </div>

          <div
            onClick={() => setOpenModal("register")}
            style={bgGradient}
            className="h-11 items-center cursor-pointer rounded flex gap-1 shadow-green shadow-green-500 bg-green-500 text-zinc-900 hover:bg-blue-600 px-3 py-2 text-center font-bold text-sm"
          >
            <ArrowRightOnRectangleIcon width={16} />
            Cadastre-se
          </div>
        </div>
      )}
    </>
  );
}
