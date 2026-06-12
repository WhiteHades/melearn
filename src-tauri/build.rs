use std::path::{Path, PathBuf};

fn main() {
    let manifest_dir = PathBuf::from(env!("CARGO_MANIFEST_DIR"));
    let out_dir = manifest_dir.join("..").join("out");

    println!("cargo:rerun-if-changed={}", out_dir.display());
    println!("cargo:rerun-if-changed=build.rs");

    if !has_built_frontend(&out_dir) {
        build_frontend(&manifest_dir.join(".."));
    }

    tauri_build::build()
}

fn has_built_frontend(out_dir: &Path) -> bool {
    if !out_dir.exists() {
        return false;
    }
    let entries = match std::fs::read_dir(out_dir) {
        Ok(entries) => entries,
        Err(_) => return false,
    };
    entries.count() > 0
}

fn build_frontend(repo_root: &Path) {
    eprintln!("[melearner build.rs] out/ missing or empty; running pnpm build");

    let candidates: [(&str, &[&str]); 4] = [
        ("pnpm", &["build"]),
        ("npm", &["run", "build"]),
        ("bun", &["run", "build"]),
        ("yarn", &["build"]),
    ];

    for (cmd, args) in candidates {
        let status = std::process::Command::new(cmd)
            .args(args)
            .current_dir(repo_root)
            .status();
        match status {
            Ok(s) if s.success() => return,
            Ok(_) => continue,
            Err(_) => continue,
        }
    }

    panic!(
        "[melearner build.rs] could not build frontend. install pnpm, npm, bun, or yarn, \
         or run `pnpm build` manually before `cargo build`."
    );
}
