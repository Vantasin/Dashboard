# 🖥️ Dashboard Docker Compose Stack

[![MIT License](https://img.shields.io/github/license/Vantasin/Dashboard?style=flat-square)](LICENSE)[
![Docker Compose](https://img.shields.io/badge/Docker-Compose-blue?logo=docker)](https://docs.docker.com/compose/)
[![Homepage](https://img.shields.io/badge/Homepage-Dashboard-green?logo=homeadvisor)](https://gethomepage.dev/)
[![ZFS](https://img.shields.io/badge/ZFS-OpenZFS-blue?style=flat-square)](https://openzfs.org/)

A self-hosted, lightweight personal dashboard built with Docker Compose. Homepage helps you monitor and access all your homelab services in one place.

---

## 📁 Directory Structure

```bash
tank/
├── docker/
│   └── compose/
│       └── dashboard/                 # Git repo lives here
│           ├── docker-compose.yml     # Main Docker Compose config
│           ├── .env                   # Runtime environment variables and secrets (gitignored!)
│           ├── env.example            # Example .env file for reference
│           ├── README.md              # This file
│           └── config/                # Homepage configuration files live here
│               ├── bookmarks.example  # Bookmarks template
│               ├── bookmarks.yaml     # Actual user-defined bookmarks (gitignored)
│               ├── docker.example     # Docker settings template
│               ├── docker.yaml        # Actual Docker settings (gitignored)
│               ├── logs/              # Logs from the Homepage container
│               │   └── homepage.log   # Container output and error log
│               ├── services.example   # Service definitions template
│               ├── services.yaml      # Actual service definitions (gitignored)
│               ├── settings.example   # Dashboard settings template
│               ├── settings.yaml      # Actual dashboard settings (gitignored)
│               ├── widgets.example    # Widget settings template
│               └── widgets.yaml       # Actual widget settings (gitignored)
```

---

## 🧰 Prerequisites

* Docker Engine
* Docker Compose V2
* Git
* (Optional) ZFS on Linux for dataset management

> ⚠️ **Note:** These instructions assume your ZFS pool is named `tank`. If your pool has a different name (e.g., `rpool`, `zdata`, etc.), replace `tank` in all paths and commands with your actual pool name.

---

## ⚙️ Setup Instructions

1. **Create the stack directory and clone the repository**

   If using ZFS:
   ```bash
   sudo zfs create -p tank/docker/compose/dashboard
   cd /tank/docker/compose/dashboard
   sudo git clone https://github.com/Vantasin/Dashboard.git .
   ```

   If using standard directories:
   ```bash
   mkdir -p ~/docker/compose/dashboard
   cd ~/docker/compose/dashboard
   git clone https://github.com/Vantasin/Dashboard.git .
   ```

2. **Configure environment variables**

   Copy and modify the `.env` file:

   ```bash
   [ -f .env ] && echo "Skipped: .env already exists" || (sudo cp env.example .env && echo "Created: .env")
   sudo nano .env
   sudo chmod 600 .env
   ```

   > **Note:** Be sure to update the `HOMEPAGE_ALLOWED_HOSTS` and if required the `HOMEPAGE_PORT`.

3. **Configure config variables**

   Copy and modify the `config/` files:

   ```bash
   sudo zsh -c 'for f in config/*.example; do target="${f%.example}.yaml"; [ ! -f "$target" ] && cp "$f" "$target" && echo "Created: $target" || echo "Skipped: $target already exists"; done'
   ```

   > **Note:** Be sure to replace `example.com` in the `services.yaml` & `settings.yaml` files with your **domain**.

   > **Optional:** You can update the `bookmarks.yaml`, `docker.yaml`, & `widgets.yaml` as required.

4. **Start dashboard**

   ```bash
   docker compose up -d
   ```

---

## 🌐 Accessing Dashboard Web UI

Once deployed, access `Dashboard` using:

- **Web Interface (HTTP):** `http://localhost:3333` or replace `localhost` with your **server/tailscale IP address**.

> **Note:** Be sure to create a `Dashboard` proxy host URL for use as `HOMEPAGE_ALLOWED_HOSTS` using [Nginx Proxy Manager](https://github.com/Vantasin/Nginx-Proxy-Manager.git) as a reverse proxy for HTTPS certificates via Let's Encrypt.

---

## 🙏 Acknowledgments

- [ChatGPT](https://openai.com/chatgpt) — for assistance in generating setup scripts and templates.
- [Homepage](https://gethomepage.dev) — A beautiful, customizable dashboard for your homelab.
- [Docker](https://www.docker.com/) — for container orchestration and runtime.
- [OpenZFS](https://openzfs.org/) — for advanced local filesystem features, dataset organization, and snapshotting.
