import React from "react";

interface ContentProps {
  children: React.ReactNode;
}

export default function Content(props: ContentProps) {
  return (
    <div className="flex flex-col gap-2 break-all sm:flex-row">
      {props.children}
    </div>
  );
}
