import { FC } from "react";
import { SearchbarProps } from "./types";

const Searchbar: FC<SearchbarProps> = ({
  searchParams,
  setSearchParams,
  children,
}) => {
  return (
    <div
      id="searchBox"
      className="bg-slate-900 border calmMovement p-4 rounded-2xl flex flex-col gap-4 border-slate-700 w-2/3"
    >
      <input
        placeholder="Search for an application"
        className="bg-transparent h-12 w-full font-mono text-lg text-slate-300 focus:border-none focus:ring-0 focus:outline-none"
        value={searchParams}
        onChange={(event) => setSearchParams(event.target.value)}
      />

      <hr />

      {children}
    </div>
  );
};

export default Searchbar;
