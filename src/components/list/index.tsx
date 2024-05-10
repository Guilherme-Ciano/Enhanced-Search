import { useEffect, useState } from "react";
import { FC } from "react";
import { AppProps, ListProps } from "./types";
import { getAllInstalledApps } from "../../utils/functions";

const List: FC<ListProps> = ({ searchedParameter }) => {
  const [apps, setApps] = useState<AppProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchInstalledApps = async () => {
    setIsLoading(true);
    try {
      const result = await getAllInstalledApps(searchedParameter);
      setApps(result as AppProps[]);
    } catch (error) {
      console.error("Error fetching installed apps:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (searchedParameter !== "") {
      fetchInstalledApps();
    } else {
      setApps([]);
    }
  }, [searchedParameter]);

  const listaFiltrada = apps.filter((app) =>
    app?.name?.toLowerCase()?.includes(searchedParameter.toLowerCase())
  );

  const listaEstaVazia = listaFiltrada.length === 0;

  return (
    <div className="max-h-80 min-h-16 overflow-y-auto overflow-x-auto">
      {!listaEstaVazia && (
        <ul
          className={`flex flex-col gap-4 m-0 p-0 justify-center items-start text-slate-500 text-left ${
            isLoading ? "fade-out" : "fade-in"
          }`}
        >
          {listaFiltrada.map((item, index) => (
            <li className="flex gap-2" key={index}>
              <div className="flex flex-col gap-1">
                <b>{item.name}</b>
                <i className="text-sm italic">{item.path}</i>
              </div>
            </li>
          ))}
        </ul>
      )}

      {listaEstaVazia && searchedParameter !== "" && (
        <ul
          className={`flex flex-col gap-4 m-0 p-0 justify-center items-center text-slate-500 text-center ${
            isLoading ? "fade-out" : "fade-in"
          }`}
        >
          <li className="flex flex-col gap-2">
            <b>🛸 Nothing here! </b>
            <i className="text-sm italic">
              Try to search for something different...
            </i>
          </li>
        </ul>
      )}

      {listaEstaVazia && searchedParameter === "" && (
        <ul
          className={`flex flex-col gap-4 m-0 p-0 justify-center items-center text-slate-500 text-center ${
            isLoading ? "fade-out" : "fade-in"
          }`}
        >
          <li className="flex flex-col gap-2">
            <b>💫 Start typing your favorite program! 💫</b>
            <i className="text-sm italic">
              Or maybe that game that you love to play...
            </i>
          </li>
        </ul>
      )}
    </div>
  );
};

export default List;
