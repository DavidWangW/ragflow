## Install front-end dependencies

   ```bash
   npm install
   ```

## Launch front-end

   ```bash
   npm run dev
   ```

   _The following output confirms a successful launch of the system:_

   ![](https://github.com/user-attachments/assets/0daf462c-a24d-4496-a66f-92533534e187)

## Develop on Windows with a remote RAGFlow backend

If your Dockerized RAGFlow services are already running on a remote machine, you can keep the frontend on Windows and point Vite at that backend in either of the following ways.

### Option 1: Keep the default proxy and use an SSH tunnel

Open a long-lived PowerShell window and run:

```powershell
ssh -N -L 9380:127.0.0.1:9380 -L 9381:127.0.0.1:9381 your_user@192.168.131.245
```

If your SSH server uses a custom port, add `-p <ssh_port>`.

If you also want to open the remote container's bundled web UI directly, add:

```powershell
-L 8080:127.0.0.1:80
```

With the tunnel active, the existing Vite proxy keeps working without any code changes because it still talks to `127.0.0.1:9380` and `127.0.0.1:9381` on your Windows machine.

### Option 2: Point the Vite proxy at the remote host directly

Set these environment variables before starting the frontend:

```powershell
$env:VITE_API_PROXY_TARGET = "http://192.168.131.245:9380"
$env:VITE_ADMIN_PROXY_TARGET = "http://192.168.131.245:9381"
npm run dev
```

You can also place the same values in a local env file such as `.env.development.local`.

If these variables are not set, Vite still defaults to:

```text
http://127.0.0.1:9380
http://127.0.0.1:9381
```

### Quick connectivity check

Before opening the app, verify the proxied API is reachable:

```powershell
curl http://127.0.0.1:9380/v1/system/status
```

If this fails while using the SSH tunnel approach, the issue is in the tunnel or remote backend rather than the frontend.

## Login to RAGFlow web UI

   Open your browser and navigate to:

   ```bash
   http://localhost:9222 or http://[YOUR_MACHINE_IP]:9222
   ```

   _Replace `[YOUR_MACHINE_IP]` with your actual machine IP address (e.g., `http://192.168.1.49:9222`)._


## Login to RAGFlow web admin UI

   Open your browser and navigate to:

   ```bash
   http://localhost:9222/admin or http://[YOUR_MACHINE_IP]:9222/admin
   ```

   _Replace `[YOUR_MACHINE_IP]` with your actual machine IP address (e.g., `http://192.168.1.49:9222/admin`)._


## Shutdown front-end

   Ctrl + C or

   ```bash
   kill -f "umi dev"
   ```
