import Header from "@/components/Header";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "マイページ",
  description: "マイページ",
}

const MyPageLayout = (props: { children: ReactNode }) => {
  return (
    <>
      <div className="mb-3">
        <Header>
          マイページ
        </Header>
      </div>

      <div className="mb-3">
        {props.children}
      </div>
    </>
  )
}

export default MyPageLayout