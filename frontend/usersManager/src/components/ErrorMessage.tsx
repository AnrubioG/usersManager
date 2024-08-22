import { ReactNode } from "react";

type ErrorMessageProps = {
  children: ReactNode;
};

export default function ErrorMessage({ children }: ErrorMessageProps) {
  return <p className=" bg-danger text-white">{children}</p>;
}
