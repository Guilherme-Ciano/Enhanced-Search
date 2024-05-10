import { FC, useState } from "react";
import Searchbar from "../searchbar";
import List from "../list";

const apps = [
  { label: "a", openApp: "a" },
  { label: "b", openApp: "b" },
  { label: "c", openApp: "c" },
  { label: "aa", openApp: "aa" },
  { label: "bb", openApp: "bb" },
  { label: "cc", openApp: "cc" },
  { label: "ccc", openApp: "ccc" },
];

const Homepage: FC = () => {
  const [searchParams, setSearchParams] = useState("");

  return (
    <div className=" w-full max-h-screen min-h-40 overflow-hidden flex absolute top-64 border border-red-500 justify-center">
      <Searchbar searchParams={searchParams} setSearchParams={setSearchParams}>
        <List apps={apps} searchedParameter={searchParams} />
      </Searchbar>
    </div>
  );
};

export default Homepage;
