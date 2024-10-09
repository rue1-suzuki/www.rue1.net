import Header from "@/components/Header";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "イベント管理",
  description: "イベント管理",
}

const EventLayout = (props: { children: ReactNode }) => {
  return (
    <>
      <div className="mb-3">
        <Header>
          イベント管理
        </Header>
      </div>

      <div className="mb-3">
        {props.children}
      </div>
    </>
  )
}

export default EventLayout
