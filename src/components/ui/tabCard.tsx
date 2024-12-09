import React from "react";
import Image from "next/image";

interface TabCardProps {
  title: string;
  subtitle: string;
  icon: any;
  isActive: boolean;
}

const TabCard: React.FC<TabCardProps> = ({
  title,
  subtitle,
  icon: Icon,
  isActive,
}) => {
  return (
    <div className="flex flex-row  pl-2">
      <div
        className={`mx-auto flex justify-center shadow-sm text-center  text-center pt-2 w-10 h-10 ${isActive ? "   bg-primary" : "text-gray-500 bg-gray-100 "}`}
      >
        <Icon
          className={`h-6 w-6 ${isActive ? "  text-white" : "text-gray-500"}`}
        />
      </div>
      <div className="flex flex-col items-start pl-2">
        <span className="font-bold text-md text-primaryText">{title}</span>
        <div className="text-sm font-normal text-primaryText">{subtitle}</div>
      </div>
    </div>
  );
};

export default TabCard;
