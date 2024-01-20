"use client";
import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import CountOnline from "./CountOnline";
import BonusDeposit from "./BonusDeposit";
import { Gamepad2, Radio, Rocket } from "lucide-react";

export default function Sidebar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <>
      <div className="fixed md:hidden tab-menu bg-[#0d0716] z-[60] bottom-0 w-full flex items-center justify-around">
        <button
          className=" h-16 w-full justify-center text-gray-300 flex flex-col items-center"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
          <h1 className="text-sm">Menu</h1>
        </button>
        <button
          className=" h-16 w-full justify-center text-gray-300 flex flex-col items-center"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <h1 className="text-sm">
            <img width={30} src="/zin-curta.png" />
          </h1>
        </button>
        <button
          onClick={() => {
            ///@ts-ignore
            window.Intercom("show");
          }}
          className=" h-16 w-full justify-center text-gray-300 flex flex-col items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
            />
          </svg>

          <h1 className="text-sm">Suporte</h1>
        </button>
      </div>
      <div
        className={`${
          isMenuOpen
            ? " fixed h-full  w-full md:w-[15rem]"
            : " -translate-x-full "
        }   min-h-screen fixed md:translate-x-0 z-50 md:w-[15rem] truncate duration-1000  md:block transition-all  bg-[#0d0716]  border-r border-white/20  `}
      >
        <div className="flex justify-end px-4 pt-4 md:hidden">
          <button className="" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
        </div>
        <Menu>
          {({ open }) => (
            <div className=" p-6  flex flex-col ">
              <Menu.Button className="cursor-pointer mb-4 font-bold text-xs text-zinc-400 flex justify-between">
                <span>ORIGINAIS DA ZINBETS</span>
                {open ? (
                  <ChevronDownIcon width={18} fill="white" />
                ) : (
                  <ChevronUpIcon width={18} fill="white" />
                )}
              </Menu.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
                show={!open}
              >
                <Menu.Items className="flex flex-col">
                  <Menu.Item as={Fragment}>
                    {({ active }) => (
                      <Link
                        href={"/crash"}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className=" text-zinc-400 hover:text-[#8845fa] rounded-2xl min-w-full py-1.5 px-1 flex gap-4 items-center"
                      >
                        <span
                          className={`${
                            active && "drop-shadow-green"
                          } hover:shadow text-base font-bold`}
                        >
                          Crash
                        </span>
                      </Link>
                    )}
                  </Menu.Item>

                  <Menu.Item as={Fragment}>
                    {({ active }) => (
                      <Link
                        href={"/double"}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className=" text-zinc-400 hover:text-[#8845fa] rounded-2xl min-w-full py-1.5 px-1 flex gap-4 items-center"
                      >
                        <span
                          className={`${
                            active && "drop-shadow-green"
                          } hover:shadow text-base font-bold`}
                        >
                          Double
                        </span>
                      </Link>
                    )}
                  </Menu.Item>

                  <Menu.Item as={Fragment}>
                    {({ active }) => (
                      <Link
                        href={"/mines"}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className=" text-zinc-400 hover:text-[#8845fa] rounded-2xl min-w-full py-1.5 px-1 flex gap-4 items-center"
                      >
                        <span
                          className={`${
                            active && "drop-shadow-green"
                          } hover:shadow text-base font-bold`}
                        >
                          Mines
                        </span>
                      </Link>
                    )}
                  </Menu.Item>

                  {/*    <Menu.Item as={Fragment}>
                    {({ active }) => (
                      <Link
                        href={"/dice"}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className=" text-zinc-400 hover:text-[#8845fa] rounded-2xl min-w-full py-1.5 px-1 flex gap-4 items-center"
                      >
                        <span
                          className={`${
                            active && "drop-shadow-green"
                          } hover:shadow text-base font-bold`}
                        >
                          Dice
                          <small className="text-red-500 font-bold ml-2 text-[10px]">
                            em breve
                          </small>
                        </span>
                      </Link>
                    )}
                  </Menu.Item>

                  <Menu.Item as={Fragment}>
                    {({ active }) => (
                      <Link
                        href={"/tower"}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className=" text-zinc-400 hover:text-[#8845fa] rounded-2xl min-w-full py-1.5 px-1 flex gap-4 items-center"
                      >
                        <span
                          className={`${
                            active && "drop-shadow-green"
                          } hover:shadow text-base font-bold`}
                        >
                          Tower
                          <small className="text-red-500 font-bold ml-2 text-[10px]">
                            em breve
                          </small>
                        </span>
                      </Link>
                    )}
                  </Menu.Item> */}
                </Menu.Items>
              </Transition>
            </div>
          )}
        </Menu>
        <Menu>
          {({ open }) => (
            <div className=" p-6  flex flex-col gap-4">
              <Menu.Button className="cursor-pointer font-bold text-xs text-zinc-400 flex justify-between">
                <span>CASSINO</span>
                {open ? (
                  <ChevronDownIcon width={18} fill="white" />
                ) : (
                  <ChevronUpIcon width={18} fill="white" />
                )}
              </Menu.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
                show={!open}
              >
                <Menu.Items className="flex flex-col">
                  <Menu.Item as={Fragment}>
                    {({ active }) => (
                      <Link
                        href={"/"}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className=" text-zinc-400 hover:text-[#8845fa] rounded-2xl min-w-full py-1.5 px-1 flex gap-4 items-center"
                      >
                        <span
                          className={`${
                            active && "drop-shadow-green"
                          } hover:shadow text-base font-bold`}
                        >
                          Populares
                        </span>
                      </Link>
                    )}
                  </Menu.Item>

                  <Menu.Item as={Fragment}>
                    {({ active }) => (
                      <Link
                        href={"/"}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className=" text-zinc-400 hover:text-[#8845fa] rounded-2xl min-w-full py-1.5 px-1 flex gap-4 items-center"
                      >
                        <span
                          className={`${
                            active && "drop-shadow-green"
                          } hover:shadow text-base font-bold`}
                        >
                          Jogos ao vivo
                        </span>
                      </Link>
                    )}
                  </Menu.Item>

                  <Menu.Item as={Fragment}>
                    {({ active }) => (
                      <Link
                        href={"/"}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className=" text-zinc-400 hover:text-[#8845fa] rounded-2xl min-w-full py-1.5 px-1 flex gap-4 items-center"
                      >
                        <span
                          className={`${
                            active && "drop-shadow-green"
                          } hover:shadow text-base font-bold`}
                        >
                          Crash Games
                        </span>
                      </Link>
                    )}
                  </Menu.Item>

                  <Menu.Item as={Fragment}>
                    {({ active }) => (
                      <Link
                        href={"/"}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className=" text-zinc-400 hover:text-[#8845fa] rounded-2xl min-w-full py-1.5 px-1 flex gap-4 items-center"
                      >
                        <span
                          className={`${
                            active && "drop-shadow-green"
                          } hover:shadow text-base font-bold`}
                        >
                          Slots
                        </span>
                      </Link>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </div>
          )}
        </Menu>

        {/*  <div className="hidden border-b border-zinc-500 p-6  flex flex-col gap-4">
        <div className="flex flex-col">
          <Link
            href={"/"}
            className=" text-zinc-400 hover:text-[#8845fa] rounded-2xl min-w-full py-1.5 px-1 flex gap-4 items-center"
          >
            <span className="hover:shadow shadow-green-500 text-base font-bold">
              Suporte Ao Vivo
            </span>
          </Link>

          <Link
            href={"/"}
            className=" text-zinc-400 hover:text-[#8845fa] rounded-2xl min-w-full py-1.5 px-1 flex gap-4 items-center"
          >
            <span className="hover:shadow shadow-green-500 text-base font-bold">
              Promoções
            </span>
          </Link>

          <Link
            href={"/"}
            className=" text-zinc-400 hover:text-[#8845fa] rounded-2xl min-w-full py-1.5 px-1 flex gap-4 items-center"
          >
            <span className="hover:shadow shadow-green-500 text-base font-bold">
              Indique Um Amigo
            </span>
          </Link>

          <Link
            href={"/"}
            className=" text-zinc-400 hover:text-[#8845fa] rounded-2xl min-w-full py-1.5 px-1 flex gap-4 items-center"
          >
            <span className="hover:shadow shadow-green-500 text-base font-bold">
              Central de Apoio
            </span>
          </Link>
        </div>
      </div> */}
      </div>
    </>
  );
}
