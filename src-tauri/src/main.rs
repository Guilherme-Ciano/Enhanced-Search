use std::path::PathBuf;
use winreg::enums::*;
use winreg::RegKey;
use serde::Serialize;
use std::hash::Hash;

#[derive(Debug, Serialize, Hash, PartialEq, Eq)]
struct App {
    name: String,
    icon_path: Option<PathBuf>,
    path: String,
    executable: String,
    command: String,
}

#[tauri::command(rename_all = "snake_case")]
fn get_installed_apps(search_term: Option<&str>) -> Vec<App> {
    let mut apps: Vec<App> = Vec::new();
    let mut num_results = 0;

    // Procurar em diferentes locais do registro onde os aplicativos podem estar listados
    let locations = [
        "SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall",
        "SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall",
    ];

    for location in &locations {
        let hklm = RegKey::predef(HKEY_LOCAL_MACHINE)
            .open_subkey(location)
            .unwrap_or_else(|_| panic!("Could not open key: {}", location));

        for key_result in hklm.enum_keys().filter_map(Result::ok) {
            if num_results >= 15 && search_term.is_none() {
                break; // Limitar o número de resultados quando o search_term está vazio
            }

            if let Ok(app_key) = hklm.open_subkey(&key_result) {
                if let Ok(name) = app_key.get_value::<String, _>("DisplayName") {
                    let icon_path = app_key.get_value::<String, _>("DisplayIcon")
                        .map(|icon| PathBuf::from(icon))
                        .ok(); // Convertendo Result<PathBuf, _> para Option<PathBuf>
                    let path = app_key.get_value::<String, _>("InstallLocation").unwrap_or_default();
                    let executable = app_key.get_value::<String, _>("UninstallString").unwrap_or_default();
                    let command = format!("cmd.exe /C start \"\" {}", executable);

                    let app = App {
                        name: name.clone(), // Mantém o nome original para o retorno
                        icon_path,
                        path,
                        executable,
                        command,
                    };

                    // Adicionar o aplicativo à lista se o termo de busca corresponder
                    if let Some(search) = search_term {
                        if name.to_lowercase().contains(&search.to_lowercase()) {
                            apps.push(app);
                            num_results += 1;
                        }
                    } else {
                        apps.push(app);
                        num_results += 1;
                    }
                }
            }
        }
    }

    apps
}


fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_installed_apps])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
