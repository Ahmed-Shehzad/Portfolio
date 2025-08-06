import React, { FC, Fragment } from "react";
import { TechIcon } from "./TechIcon";
import { twMerge } from "tailwind-merge";

type ToolboxItem = {
  title: string;
  iconType: React.ElementType;
};

type ToolboxItemsProps = {
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
      <div
        className={twMerge(
          "flex flex-none py-0.5 gap-6 pr-6",
          itemsWrapperClassName
        )}
      >
        {["toolbox-item-1", "toolbox-item-2", "toolbox-item-3"].map(
          (section) => (
            <Fragment key={section}>
              {items.map((item) => {
                return (
                  <div
                    key={`${item.title}-${section}`}
                    className="inline-flex items-center gap-4 py-2 px-3 outline outline-white/10 rounded-lg"
                  >
                    <TechIcon component={item.iconType} alt={item.title} />
                  </div>
                );
              })}
            </Fragment>
          )
        )}
      </div>
    </div>
  );
};
