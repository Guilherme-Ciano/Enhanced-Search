import { Dispatch, ReactNode, SetStateAction } from "react";

export interface SearchbarProps {
  searchParams: string;
  setSearchParams: Dispatch<SetStateAction<string>>;
  children: ReactNode;
}
