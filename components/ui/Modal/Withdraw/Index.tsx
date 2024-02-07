"use client"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { PencilSquareIcon } from "@heroicons/react/20/solid"
import Input from "../../Form/Input"
import Link from "next/link"
import { useModal } from "@/contexts/ModalContext"
import { useAccount } from "@/contexts/AccountContext"
import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { yupResolver } from "@hookform/resolvers/yup"
import { useWallet } from "@/contexts/WalletContext"
import { formatCentsToBRL } from "@/utils/currency"
import BadgeErrorsMessage from "../../Errors/BadgeErrorsMessage"
import { api } from "@/lib/api"
import { CircleDollarSign, Wallet } from "lucide-react"

interface IFormInputs {
  wallet_id: string
  amount: string
  balance: number
  min_cashout_amount: number
}

export default function Withdraw() {
  const { setCloseModal } = useModal()
  const { pixKeys, fetchAccount, isLoading: isLoadingAccount } = useAccount()
  const { user } = useAuth()
  const {
    wallets,
    fetchBalance,
    fetchBonus,
    fetchWallets,
    isLoading: isLoadingWallet,
  } = useWallet()
  const [messageError, setMessageError] = useState({ type: "", message: "" })

  const schema = yup
    .object({
      balance: yup.number(),
      min_cashout_amount: yup.number(),
      wallet_id: yup.string().required("Selecione uma carteira"),
      amount: yup
        .string()
        .required("Informe o valor do saque")
        .test(
          "is-num",
          "Valor maior que o saldo disponível",
          (value, context) => {
            if (!value) return false

            const amount = Number(value.replace(/[^0-9]/g, ""))

            return amount <= Number(context.parent.balance)
          }
        )
        .test(
          "is-num",
          "Valor menor que o mínimo permitido",
          (value, context) => {
            if (!value) return false

            const amount = Number(value.replace(/[^0-9]/g, ""))

            return amount >= Number(context.parent.min_cashout_amount)
          }
        ),
    })
    .required()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data: IFormInputs) => {
    const amount = data.amount.replace(/[^0-9]/g, "")
    const wallet_id = Number(data.wallet_id)

    setMessageError({ type: "loading", message: "" })

    await api
      .post("/payment/cashout/request-cashout", {
        amount,
        wallet_id,
      })
      .then(response => {
        setMessageError({ type: "success", message: response.data.message })
        fetchBalance()
        fetchBonus()
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
        fetchAccount()
        fetchWallets()
      })
  }

  const handleChangeWallet = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const wallet = wallets?.find(
      wallet => wallet.id == Number(event.target.value)
    )

    if (wallet) {
      setValue("balance", wallet?.balance)
      setValue("min_cashout_amount", wallet?.min_cashout_amount)
    }
  }

  useEffect(() => {
    fetchAccount()
    fetchWallets()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (wallets?.length) {
      if (wallets[0].id) setValue("wallet_id", String(wallets[0].id))
      if (wallets[0].balance) setValue("balance", Number(wallets[0].balance))
      if (wallets[0].min_cashout_amount)
        setValue("min_cashout_amount", Number(wallets[0].min_cashout_amount))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallets])

  if (isLoadingAccount || isLoadingWallet) {
    return (
      <div className="mt-8 w-full flex items-center justify-center">
        <div className="rounded-full border-r-green-900 border-b-green-900 border-4 border-green-500 h-8 w-8 animate-spin"></div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="text-lg text-purple font-bold mb-4">
        Solicitar Saque
      </div>

      {pixKeys?.pix_key ? (
        <>
          <div className="text-base font mb-3 flex">
            <div>
              Minha Chave PIX:{" "}
              <span className="font-bold">{pixKeys?.pix_key}</span>
              <br />
              Tipo da Chave:{" "}
              <span className="font-bold">
                {pixKeys?.pix_key_type.toUpperCase()}
              </span>
            </div>

            <Link
              href="/user/account"
              title="Alterar chave PIX"
              onClick={() => setCloseModal()}
              className="h-8 flex items-center justify-center gap-2 rounded p-2 border border-[#8845fa] hover:bg-zinc-400/20 text-white ml-4"
            >
              <PencilSquareIcon
                width={20}
                height={20}
                className="text-[#8845fa]"
              />
              <span className="text-xs">Alterar PIX</span>
            </Link>
          </div>

          <div className="text-sm font-semibold mb-3">
            Meu CPF: <span className="font-bold">{user?.document}</span>
          </div>

          <div className="text-xs font-light text-white mb-3">
            Atenção! Seu saque só pode ser realizado na chave PIX vinculada ao
            CPF informado no seu cadastro
          </div>

          <div className="floating mb-3 relative">
            <select
              {...register("wallet_id")}
              className={`${errors.wallet_id?.message &&
                "border-red-500 border rounded-b-none"
                } disabled:cursor-not-allowed border border-white/10 bg-[#07050a] text-base text-zinc-300 appearance-none block w-full px-4 h-14 leading-10 rounded shadow-sm placeholder-gray-400 focus:outline-none focus:ring-0`}
              onChange={event => handleChangeWallet(event)}
            >
              {wallets?.map(wallet => (
                <option key={wallet.id} value={wallet.id}>
                  {wallet?.name}
                </option>
              ))}
            </select>
            <label className="flex items-center gap-2 mb-2 uppercase text-zinc-400 text-xs font-bold absolute top-0 left-0 px-4 py-[1.35rem] h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out ">
              <Wallet size={16} />
              Carteira
            </label>

            {errors?.wallet_id?.message && (
              <div className="text-xs p-1 text-white text-center font-normal bg-red-500 w-full rounded-b-md">
                {errors?.wallet_id?.message}
              </div>
            )}
          </div>

          <Input
            type="tel"
            title="Valor a ser sacado"
            currency={true}
            icon={<CircleDollarSign size={16} />}
            {...register("amount")}
            errors={errors.amount?.message}
          />

          <div className="-mt-1 text-sm font-semibold">
            Disponivel para saque:{" "}
            <span className="text-[#8845fa]">
              {formatCentsToBRL(Number(watch("balance")))}
            </span>
          </div>

          <div className="text-xs font-semibold text-red-500 mb-3">
            Valor mínimo do saque é de{" "}
            {formatCentsToBRL(Number(watch("min_cashout_amount")))}
          </div>

          <BadgeErrorsMessage
            type={messageError.type}
            message={messageError.message}
          />

          <button
            type="submit"
            className="rounded w-full bg-[#8845fa] hover:bg-[#713ad6] text-white-400 p-2 text-center shadow-green"
          >
            Sacar
          </button>
        </>
      ) : (
        <div className="border border-red-500 rounded-lg p-4 flex flex-col gap-4">
          Para efetuar saque, cadastre sua chave PIX.
          <Link
            href="/user/account"
            title="Cadastrar chave PIX"
            onClick={() => setCloseModal()}
            className="h-8 flex items-center justify-center gap-2 rounded p-2 border border-green-500 hover:bg-zinc-400/20 text-white"
          >
            <PencilSquareIcon
              width={20}
              height={20}
              className="text-green-500"
            />
            <span className="text-xs">Cadastrar PIX</span>
          </Link>
        </div>
      )}
    </form>
  )
}
