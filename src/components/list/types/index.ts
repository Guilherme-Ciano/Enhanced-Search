export interface ListProps {
  apps: any[];
  searchedParameter: string;
}

export interface AppProps {
  name: string;
  icon: string;
  path: string;
  executable: string;
  command: string;
}
