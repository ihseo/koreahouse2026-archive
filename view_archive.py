#!/usr/bin/env python3
"""
Local viewer for the Korea House 2026 archive.

This mimics how Cloudflare Pages serves the site:
- Static files served as-is.
- Missing paths return /404.html (status 404).

Run from the archive folder:
    python3 view_archive.py

Then open: http://localhost:8000/_archive_index.html
"""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import os, sys

ROOT = Path(__file__).parent / "site"
PORT = int(os.environ.get("PORT", "8000"))


class ArchiveHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def send_error(self, code, message=None, explain=None):
        if code == 404 and self.command in ("GET", "HEAD"):
            stub = ROOT / "404.html"
            if stub.is_file():
                body = stub.read_bytes()
                self.send_response(404)
                self.send_header("Content-Type", "text/html; charset=utf-8")
                self.send_header("Content-Length", str(len(body)))
                self.end_headers()
                if self.command == "GET":
                    self.wfile.write(body)
                return
        super().send_error(code, message, explain)


def main():
    if not ROOT.exists():
        print(f"ERROR: site directory not found: {ROOT}", file=sys.stderr)
        sys.exit(1)
    server = ThreadingHTTPServer(("127.0.0.1", PORT), ArchiveHandler)
    print(f"Serving Korea House 2026 archive at:")
    print(f"  http://localhost:{PORT}/_archive_index.html   ← curated landing page")
    print(f"  http://localhost:{PORT}/                       ← original homepage")
    print(f"\nMissing paths -> /404.html (matches Cloudflare Pages behavior)")
    print(f"Press Ctrl+C to stop.")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopped.")
        server.server_close()


if __name__ == "__main__":
    main()
