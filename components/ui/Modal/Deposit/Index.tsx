"use client"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import CountDown from "../../CountDown/Index"
import Input from "../../Form/Input"
import Image from "next/image"
import { useState } from "react"
import { api } from "@/lib/api"
import { formatBRL } from "@/utils/currency"
import BadgeErrorsMessage from "../../Errors/BadgeErrorsMessage"
import copyText from "@/utils/copyText"
import { CircleDollarSign, DollarSign } from "lucide-react"

interface IFormInputs {
  amount: string
  bonus: boolean
}

type Pix = {
  message: string
  pix_url: string
  pix_qr_code: string
  amount: number
}

const schema = yup
  .object({
    amount: yup
      .string()
      .test("is-num", "Valor mínimo de R$1,00", value => {
        if (!value) return false
        const amount = value.replace(/[^0-9]/g, "")
        if (parseInt(amount) < 100) {
          return false
        }

        return true
      })
      .required("Valor Obrigatório"),
    terms: yup
      .boolean()
      .oneOf([true], "Você deve aceitar os termos e condições"),
  })
  .required()

export default function Deposit() {
  const [messageError, setMessageError] = useState({ type: "", message: "" })
  const [isLoading, setIsLoading] = useState(false)
  const [pix, setPix] = useState<Pix>()

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data: IFormInputs) => {
    const amount = data.amount.replace(/[^0-9]/g, "")
    const bonus = data.bonus
    setIsLoading(true)
    setPix(undefined)
    setMessageError({ type: "", message: "" })

    await api
      .post("/payment/deposit/add-credit", {
        amount,
        has_bonus: bonus,
      })
      .then(response => {
        setPix(response.data)
      })
      .catch(error => {
        if (error.response) {
          setMessageError({
            type: "error",
            message: error.response.data.message,
          })
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <>
      <div className="text-lg text-green-500 font-bold mb-4">Depósito</div>

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

        <div className="bg-green-900/50 text-green-500 rounded p-2 text-center text-sm w-full mb-4">
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
            className="cursor-pointer bg-[#8845fa] hover:bg-[#713ad6] text-white p-2 rounded-lg font-bold"
            onClick={() => setValue("amount", "R$ 30,00")}
          >
            R$30,00
          </div>
          <div
            className="cursor-pointer  bg-[#8845fa] hover:bg-[#713ad6] text-white p-2 rounded-lg font-bold"
            onClick={() => setValue("amount", "R$ 40,00")}
          >
            R$40,00
          </div>
          <div
            className="cursor-pointer bg-[#8845fa] hover:bg-[#713ad6] text-white p-2 rounded-lg font-bold"
            onClick={() => setValue("amount", "R$ 50,00")}
          >
            R$50,00
          </div>
          <div
            className="cursor-pointer bg-[#8845fa] hover:bg-[#713ad6] text-white p-2 rounded-lg font-bold"
            onClick={() => setValue("amount", "R$ 100,00")}
          >
            R$100,00
          </div>
          <div
            className="cursor-pointer bg-[#8845fa] hover:bg-[#713ad6] text-white p-2 rounded-lg font-bold"
            onClick={() => setValue("amount", "R$ 500,00")}
          >
            R$500,00
          </div>
          <div
            className="cursor-pointer bg-[#8845fa] hover:bg-[#713ad6] text-white p-2 rounded-lg font-bold"
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
          <label htmlFor="bonus" className="text-xs font-bold text-white ">
            Desejo Acrescentar 100% de bônus
          </label>
        </div>

        <button
          type="submit"
          className="rounded w-full bg-[#8845fa] hover:bg-[#713ad6] text-white p-2 text-center font-bold shadow-green"
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
  )
}
