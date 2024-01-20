"use client"
import SignIn from "@/components/ui/Header/SignIn"
import { useAuth } from "@/contexts/AuthContext"
import { useGame } from "@/contexts/Games/GameContext"
import { ViewfinderCircleIcon } from "@heroicons/react/20/solid"
import { LockClosedIcon } from "@heroicons/react/24/outline"
import { useEffect, useState } from "react"

type PageProps = {
  params: {
    slug: string
  }
}

export default function GameProviderPage({ params }: PageProps) {
  const { user } = useAuth()
  const { slug } = params
  const { game, fetchGame, isLoading, iframeGame } = useGame()
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false)

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen)

    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
  }

  useEffect(() => {
    fetchGame(slug)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className="rounded-lg overflow-hidden border border-white/10 bg-[#0d0716] flex flex-col">
        <div
          className={`
            ${isLoading ? "animate-pulse" : ""} 
            ${
              isFullScreen
                ? "fixed top-0 left-0 bottom-0 right-0 z-[999] "
                : "aspect-video"
            }
            bg-zinc-600 flex-1
            bg-cover bg-center rounded-lg overflow-hidden
          `}
          style={{
            backgroundImage: `url('/${process.env.NEXT_PUBLIC_SITE_NAME}/games/pg/background/${game?.game_id}.jpg')`,
          }}
        >
          {!isLoading && !user ? (
            <div className="bg-zinc-700/40 flex justify-center items-center h-full flex-col gap-6">
              <LockClosedIcon className="w-10 h-10 text-green-500" />

              <span>Voce precisa entrar para jogar.</span>

              <SignIn />
            </div>
          ) : (
            iframeGame && (
              <iframe src={iframeGame} width={"100%"} height={"100%"} />
            )
          )}
        </div>

        <div className="flex h-fit justify-between gap-4 p-6 border border-white/10 bg-[#0d0716] items-center">
          <div className="flex-1">
            <h1 className="text-lg font-bold text-white">{game?.name}</h1>
            <div className="text-sm font-medium">
              {game?.games_provider.name}
            </div>
          </div>
          <div className="w-fit h-full items-center">
            <div
              onClick={toggleFullScreen}
              className={`
                  ${
                    isFullScreen
                      ? "fixed top-4 right-4 z-[999] bg-zinc-700"
                      : "static"
                  }
                  rounded border border-zinc-600 p-2 h-fit w-fit hover:bg-zinc-800 cursor-pointer
                `}
            >
              <ViewfinderCircleIcon className="w-6 h-6 text-zinc-400 mx-auto" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
