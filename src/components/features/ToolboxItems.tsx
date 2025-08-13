"use client";

import { TechIcon } from "@/components/ui";
import React, { FC, Fragment } from "react";
import { twMerge } from "tailwind-merge";
import type { ToolboxItem } from "@/shared/types";

export type ToolboxItemsProps = {
  items: ToolboxItem[];
  className?: string;
  itemsWrapperClassName?: string;
};

export const ToolboxItems: FC<ToolboxItemsProps> = (props) => {
  const { items, className, itemsWrapperClassName } = props;
  return (
    <div
      className={twMerge(
        "flex [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
        className
      )}
    >
      <div className={twMerge("flex flex-none gap-6 py-0.5 pr-6", itemsWrapperClassName)}>
        {["toolbox-item-1", "toolbox-item-2", "toolbox-item-3"].map((section) => (
          <Fragment key={section}>
            {items.map((item) => {
              return (
                <div
                  key={`${item.title}-${section}`}
                  className="inline-flex items-center gap-4 rounded-lg px-3 py-2 outline outline-white/10"
                >
                  <TechIcon component={item.iconType} alt={item.title} />
                </div>
              );
            })}
          </Fragment>
        ))}
      </div>
    </div>
  );
};
