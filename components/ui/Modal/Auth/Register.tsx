"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { cpf } from "cpf-cnpj-validator";

import Logo from "@/components/Logo";
import Input from "../../Form/Input";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { useModal } from "@/contexts/ModalContext";

import { useAuth } from "@/contexts/AuthContext";
import { SignUpFormData } from "@/contexts/AuthContext/types";
import BadgeErrorsMessage from "../../Errors/BadgeErrorsMessage";
import { Fingerprint, KeyRound, Mail, Phone, User2 } from "lucide-react";
import ConfirmRegister from "./ConfirmRegister";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";

const schema = yup
  .object({
    name: yup.string().required("Nome Obrigatório"),
    phone: yup.string().required("Telefone Obrigatório"),
    document: yup
      .string()
      .min(11, "O CPF deve ter no mínimo 11 caracteres")
      .required("CPF Obrigatório")
      .test("is-num", "CPF inválido", (value) => cpf.isValid(value)),
    email: yup.string().email("E-mail inválido").required("E-mail obrigatório"),
    password: yup
      .string()
      .min(8, "A senha deve ter no mínimo 8 caracteres")
      .required("Senha Obrigatória"),
    password_confirmation: yup
      .string()
      .oneOf([yup.ref("password"), ""], "As senhas devem ser iguais")
      .required("Confirmação de senha obrigatória"),
    ref: yup.string().optional(),
  })
  .required();

export default function Register() {
  const { setOpenModal, setCloseModal } = useModal();
  const [messageError, setMessageError] = useState({ type: "", message: "" });
  const { signUp, ref } = useAuth();
  const [close, closeHandler] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    setMessageError({ message: "", type: "loading" });

    const response = await signUp(data);

    setMessageError({ message: response.message, type: response.type });

    for (let key in response.errors) {
      /* @ts-ignore */
      setError(key, {
        type: "manual",
        message: response.errors[key][0],
      });
    }

    if (response.type === "success") {
      setCloseModal();
    }
  };

  useEffect(() => {
    if (ref) {
      setValue("ref", ref);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="justify-center flex items-center w-full mb-10">
        <Logo />
      </div>

      <div className="justify-flex-end block mb-6">
        <p className="text-white-400 text-md">Novo membro?</p>
        <h1 className="text-white-700 text-xl">Cadastra-se agora, é fácil</h1>
      </div>

      <BadgeErrorsMessage
        type={messageError.type}
        message={messageError.message}
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="name"
          title="Nome"
          icon={<User2 size={16} />}
          placeholder="Digite seu nome"
          required
          {...register("name")}
          errors={errors.name?.message}
        />

        <Input
          type="text"
          title="CPF"
          mask="999.999.999-99"
          icon={<Fingerprint size={16} />}
          placeholder="Digite seu CPF"
          required
          {...register("document")}
          errors={errors.document?.message}
        />

        <Input
          type="email"
          title="E-mail"
          placeholder="Digite seu e-mail"
          icon={<Mail size={16} />}
          required
          {...register("email")}
          errors={errors.email?.message}
        />

        <Input
          type="phone"
          title="Telefone"
          mask="(99) 99999-9999"
          icon={<Phone size={16} />}
          placeholder="Digite seu telefone"
          required
          {...register("phone")}
          errors={errors.phone?.message}
        />

        <Input
          type="password"
          icon={<KeyRound size={16} />}
          title="Senha"
          required
          placeholder="Digite sua senha"
          {...register("password")}
          errors={errors.password?.message}
        />

        <Input
          type="password"
          title="Confirmação de senha"
          icon={<KeyRound size={16} />}
          required
          placeholder="Digite sua senha novamente"
          {...register("password_confirmation")}
          errors={errors.password_confirmation?.message}
        />

        <div className="w-full text-center text-xs text-zinc-400 mt-6">
          Ao registrar-se, você concorda com os
          <b className="ml-2 text-green-500 cursor-pointer">
            termos e condições
          </b>
        </div>

        <button
          className="mt-8 flex items-center justify-center gap-2 text-white-400  rounded-lg shadow-green bg-[#8845fa] hover:bg-[#713ad6] p-3 w-full"
          type="submit"
        >
          Criar conta <ArrowRightIcon className="w-5 h-5" />
        </button>
      </form>

      <div className="w-full text-center text-xs text-zinc-400 mt-6">
        Já tem uma conta?
        <b
          className="ml-2 text-green-500 cursor-pointer"
          onClick={() => setOpenModal("login")}
        >
          Entre na sua conta
        </b>
      </div>
    </>
  );
}
