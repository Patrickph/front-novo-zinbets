import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import Link from "next/link";

import Logo from "@/components/Logo";
import Footer from "@/components/ui/Footer";
import Sidebar from "@/components/ui/Sidebar";
import TopBar from "@/components/ui/Topbar";

import { ModalContextProvider } from "@/contexts/ModalContext";

import Profile from "@/components/ui/Header/Profile";
import Modal from "@/components/ui/Modal/Index";
import { AccountContextProvider } from "@/contexts/AccountContext";
import { AffiliateContextProvider } from "@/contexts/AffiliateContext";
import { AuthContextProvider } from "@/contexts/AuthContext";
import { CrashContextProvider } from "@/contexts/Games/CrashContext";
import { DoubleContextProvider } from "@/contexts/Games/DoubleContext";
import { GameContextProvider } from "@/contexts/Games/GameContext";
import { MinesContextProvider } from "@/contexts/Games/MinesContext";
import { TransactionContextProvider } from "@/contexts/TransactionContext";
import { WalletContextProvider } from "@/contexts/WalletContext";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { Metadata } from "next";
import "./globals.css";
import "./layout.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_SITE_NAME,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthContextProvider>
      <ModalContextProvider>
        <AccountContextProvider>
          <WalletContextProvider>
            <TransactionContextProvider>
              <AffiliateContextProvider>
                <MinesContextProvider>
                  <CrashContextProvider>
                    <DoubleContextProvider>
                      <GameContextProvider>
                        <Analytics />
                        <html lang="pt-BR">
                          <head>
                            <script
                              dangerouslySetInnerHTML={{
                                __html: `(function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/z00t30ir';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(document.readyState==='complete'){l();}else if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();
`,
                              }}
                            ></script>
                          </head>
                          <body
                            className={`${inter.className}  text-white bg-[#08040f]`}
                          >
                            <Theme appearance="dark" accentColor="indigo">
                              <TopBar />

                              <header className="fixed z-50 tab-header bg-[#0d0716] border-b border-white/20 w-full h-[80px] px-4 md:px-6 gap-4 flex justify-between items-center ">
                                <div className="flex h-full py-6 items-center">
                                  <div className="h-full max-w-[6rem] md:max-w-full flex items-center">
                                    <Link href={"/"}>
                                      <Logo />
                                    </Link>
                                  </div>
                                </div>
                                <Profile />
                              </header>

                              <div className="pt-20 text-white h-full  w-full flex-1 flex">
                                <Sidebar />

                                <div className="flex-1 md:pl-[15rem] flex flex-col justify-between gap-4">
                                  <div className="flex flex-col px-4 md:px-6 py-6 mx-auto w-[calc(98vw)] md:w-[calc(100vw-18rem)] lg:max-w-6xl gap-8">
                                    {children}
                                  </div>

                                  <Footer />
                                </div>
                              </div>
                              <Modal />

                              {/* <MenuMobile /> */}
                            </Theme>
                          </body>
                        </html>
                      </GameContextProvider>
                    </DoubleContextProvider>
                  </CrashContextProvider>
                </MinesContextProvider>
              </AffiliateContextProvider>
            </TransactionContextProvider>
          </WalletContextProvider>
        </AccountContextProvider>
      </ModalContextProvider>
    </AuthContextProvider>
  );
}
