import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def log_message(self, format, *args):
        # Clean terminal output
        sys.stdout.write(f"[Ecobank WealthAI Demo] {self.address_string()} - {format%args}\n")

def run():
    os.chdir(DIRECTORY)
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        url = f"http://localhost:{PORT}/index.html"
        print("=" * 70)
        print(" ECOBANK WEALTH MANAGEMENT - 2ND DEMO AI SYSTEM")
        print("=" * 70)
        print(f" Demo Server running at: {url}")
        print(" Ready for Ecobank Evaluation Team (eProcess Ghana, Group Wealth, InfoSec)")
        print(" Press Ctrl+C to stop the server.")
        print("=" * 70)
        try:
            webbrowser.open(url)
        except Exception:
            pass
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down demo server.")

if __name__ == "__main__":
    run()
