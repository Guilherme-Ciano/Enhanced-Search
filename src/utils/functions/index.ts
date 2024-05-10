import { invoke } from "@tauri-apps/api/tauri";

export async function getAllInstalledApps(searchedParameter: string) {
  const listOfPrograms = await invoke("get_installed_apps", {
    search_term: searchedParameter,
  });

  return listOfPrograms;
}
