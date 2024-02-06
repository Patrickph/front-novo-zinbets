"use client";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import CountDown from "../../CountDown/Index";
import Input from "../../Form/Input";
import Image from "next/image";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { formatBRL } from "@/utils/currency";
import BadgeErrorsMessage from "../../Errors/BadgeErrorsMessage";
import copyText from "@/utils/copyText";
import { CircleDollarSign, DollarSign } from "lucide-react";

interface IFormInputs {
  amount: string;
  bonus: boolean;
}

type Pix = {
  message: string;
  pix_url: string;
  pix_qr_code: string;
  amount: number;
};

const schema = yup
  .object({
    amount: yup
      .string()
      .test("is-num", "Valor mínimo de R$5,00", (value) => {
        if (!value) return false;
        const amount = value.replace(/[^0-9]/g, "");
        if (parseInt(amount) < 500) {
          return false;
        }

        return true;
      })
      .required("Valor Obrigatório"),
    terms: yup
      .boolean()
      .oneOf([true], "Você deve aceitar os termos e condições"),
  })
  .required();

export default function Deposit() {
  const [messageError, setMessageError] = useState({ type: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [pix, setPix] = useState<Pix>();

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: IFormInputs) => {
    const amount = data.amount.replace(/[^0-9]/g, "");
    const bonus = data.bonus;
    setIsLoading(true);
    setPix(undefined);
    setMessageError({ type: "", message: "" });

    await api
      .post("/payment/deposit/add-credit", {
        amount,
        has_bonus: bonus,
      })
      .then((response) => {
        setPix(response.data);
      })
      .catch((error) => {
        if (error.response) {
          setMessageError({
            type: "error",
            message: error.response.data.message,
          });
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const amount = watch("amount");

    if (amount) {
      if (parseInt(amount.toString().replace(/[^0-9]/g, "")) < 500) {
        setError("amount", {
          type: "custom",
          message: "Valor mínimo do depósito é de R$ 5,00",
        });
      } else {
        setError("amount", { type: "custom", message: "" });
      }
    }
  }, [watch("amount")]);

  return (
    <>
      <div className="text-lg text-purple mb-4">Depósito</div>

      <CountDown minutes={10} />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`
        ${pix ? "hidden" : "block"}
         p-5 rounded`}
      >
        {/* <div className='text-green-400 mb-2'>
          Possui cupom?
        </div> */}

        <div className="text-green-deposit rounded p-2 text-center text-sm w-full mb-4">
          Dobramos seu depósito 100% até R$7000
        </div>

        <Input
          type="tel"
          title="Valor a ser depositado"
          currency={true}
          {...register("amount", { required: true })}
          errors={errors.amount?.message}
          icon={<CircleDollarSign size={16} />}
        />

        <div className="flex gap-2 overflow-x-auto p-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 mb-2">
          <div
            className="cursor-pointer bg-[#8845fa] hover:bg-[#713ad6] text-white-600 p-2 rounded-lg "
            onClick={() => setValue("amount", "R$ 20,00")}
          >
            R$20,00
          </div>
          <div
            className="cursor-pointer  bg-[#8845fa] hover:bg-[#713ad6] text-white-600 p-2 rounded-lg "
            onClick={() => setValue("amount", "R$ 40,00")}
          >
            R$40,00
          </div>
          <div
            className="cursor-pointer bg-[#8845fa] hover:bg-[#713ad6] text-white-600 p-2 rounded-lg "
            onClick={() => setValue("amount", "R$ 50,00")}
          >
            R$50,00
          </div>
          <div
            className="cursor-pointer bg-[#8845fa] hover:bg-[#713ad6] text-white-600 p-2 rounded-lg "
            onClick={() => setValue("amount", "R$ 100,00")}
          >
            R$100,00
          </div>
          <div
            className="cursor-pointer bg-[#8845fa] hover:bg-[#713ad6] text-white-600 p-2 rounded-lg "
            onClick={() => setValue("amount", "R$ 500,00")}
          >
            R$500,00
          </div>
          <div
            className="cursor-pointer bg-[#8845fa] hover:bg-[#713ad6] text-white-600 p-2 rounded-lg "
            onClick={() => setValue("amount", "R$ 1000,00")}
          >
            R$1000,00
          </div>
        </div>

        <BadgeErrorsMessage
          type={messageError.type}
          message={messageError.message}
        />

        <div className="gap-2 flex justify-center items-center my-4">
          <input
            id="bonus"
            type="checkbox"
            className="w-4 h-4 accent-green-500 text-green-600 bg-gray-100 border-gray-300 rounded "
            {...register("bonus", { value: true })}
          />
          <label htmlFor="bonus" className="text-xs font-bold text-white-400 ">
            Desejo Acrescentar 100% de bônus
          </label>
        </div>

        <button
          type="submit"
          className="rounded w-full bg-[#8845fa] hover:bg-[#713ad6] text-white-400 p-2 text-center  shadow-green"
        >
          Gerar PIX
        </button>
      </form>

      {isLoading && (
        <div className="mt-8 w-full flex items-center justify-center">
          <div className="rounded-full border-r-green-900 border-b-green-900 border-4 border-green-500 h-8 w-8 animate-spin"></div>
        </div>
      )}
      {pix && (
        <div className="bg-zinc-600 p-5 rounded mt-4">
          <div className="text-center font-semibold">
            Escaneie a imagem para fazer o pagamento
          </div>

          <Image
            unoptimized
            src={
              pix?.pix_qr_code
                ? pix?.pix_qr_code.includes("data:image/gif;base64,")
                  ? "data:image/gif;base64," + pix?.pix_qr_code
                  : pix?.pix_qr_code
                : ""
            }
            width={200}
            height={200}
            alt="pix"
            className="rounded mx-auto my-4 border-green-500 border-4"
          />

          <div className="text-center font-semibold text-green-500 text-3xl">
            {formatBRL(pix.amount / 100)}
          </div>

          <div
            onClick={() => copyText(pix.pix_url)}
            className="my-4 cursor-pointer rounded w-full bg-green-500 hover:bg-green-500/70 text-zinc-900 p-2 text-center font-bold shadow-green"
          >
            Copiar Código QR
          </div>
        </div>
      )}
    </>
  );
}
