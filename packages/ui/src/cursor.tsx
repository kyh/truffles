import type { HTMLAttributes } from "react";
import React from "react";
import { cva } from "class-variance-authority";

import { Balloon } from "./balloon";

type CursorProps = {
  type: "normal" | "dark";
  from: "left" | "right";
  children: React.ReactNode;
} & HTMLAttributes<HTMLDivElement>;

const cursorStyles = cva("cursor-pointer");

export const Cursor = ({
  type,
  from,
  children,
  className,
  ...props
}: CursorProps) => {
  return (
    <div className={cursorStyles({ className })} {...props}>
      <Balloon variant={type} from={from}>
        {children}
      </Balloon>
    </div>
  );
};