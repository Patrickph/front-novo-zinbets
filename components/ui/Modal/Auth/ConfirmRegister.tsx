"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { cpf } from "cpf-cnpj-validator";

import Logo from "@/components/Logo";
import Input from "../../Form/Input";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { useModal } from "@/contexts/ModalContext";

export default function ConfirmRegister({
  close,
  dontClose,
}: {
  close: any;
  dontClose: any;
}) {
  return (
    <>
      <div className="justify-center flex items-center w-full mb-10">
        <Logo />
      </div>
      <h1 className="font-bold text-lg text-center">
        Tem certeza que deseja cancelar seu registro?
      </h1>
      <p className="text-sm text-center my-4">
        Cadastre-se, deposite agora e ganhe até R$7000 em bônus.
      </p>

      <button
        onClick={dontClose}
        className="w-full bg-[#8845fa] hover:bg-[#713ad6] text-white font-bold rounded-lg py-3"
      >
        Continuar
      </button>
      <button className="mt-4 text-xs" onClick={close}>
        Sim, quero cancelar
      </button>
    </>
  );
}
