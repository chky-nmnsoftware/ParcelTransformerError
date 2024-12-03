import { Parcel } from '@parcel/core';
import path from 'path';
import { fileURLToPath } from 'url';
import open from "open";

// Required to convert the current module URL to a path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function buildAndRetrieveHashes() {
    // Define the entry file or directory
    const entryFile = path.join(__dirname, 'src/index.html')
    const distDir = path.join(__dirname, 'dist')

    // Define the port
    const portArgIndex = process.argv.indexOf("--port")
    const port = Number.parseInt(process.argv[portArgIndex + 1])
    if (Number.isNaN(port) || portArgIndex < 0) return console.error("🚨 CUSTOM WATCHER ERROR: Port not supplied. Please provide a port using  ")

    // Initialize a new Parcel bundler
    const bundler = new Parcel({
        entries: entryFile,
        defaultConfig: '@parcel/config-default',
        mode: 'development', // 'production' or 'development'
        targets: {
            default: {
                distDir: distDir,
                publicUrl: "."
            }
        },
        serveOptions: {
            port
        },
        hmrOptions: {
            port
        },
        additionalReporters: [
            {packageName: '@parcel/reporter-cli', resolveFrom: __filename}
        ]
    })

    try {
        let opened
        // Tell the bundler to watch the project
        await bundler.watch(async (error, event) => {
            if (error) throw error

            if (event.type === "buildSuccess") {
                // Make placement ts files into JSON
                // await generateJSONFiles(distDir)
                if (!opened) await open(`http://localhost:${port}`)
                opened = true
            } else {
                console.log(event.diagnostics)
            }
        })
    } catch (error) {
        console.error('Build failed:', error);
    }
}

buildAndRetrieveHashes();
