#!/usr/bin/env python3
"""
Local server for the platform  ·  serve.py
==============================================================================
Why this file exists instead of `python -m http.server`.

Python's built-in server answers EVERY request with the whole file and a plain
200. It ignores the `Range:` header completely — there is no Range handling in
SimpleHTTPRequestHandler at all.

For HTML and CSS that is fine. For video it is not: dragging the progress bar
is the browser asking for one slice of the file ("send me bytes 4,000,000
onwards"). A server that cannot answer that leaves the browser unable to jump
forward, so the seek bar looks present but does nothing.

This server answers those requests properly with `206 Partial Content`, so a
lesson video behaves locally exactly as it will on the real site. GitHub Pages
and Bunny Stream both support ranges; only the test server did not, which is
why the problem appeared on your machine and would not have appeared online.

Run it by double-clicking start-server.bat, or directly:

    python serve.py            # port 8080
    python serve.py 9000       # another port
==============================================================================
"""

import os
import re
import sys
import http.server
import socketserver
import webbrowser
import threading

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8080
ROOT = os.path.dirname(os.path.abspath(__file__))

RANGE_RE = re.compile(r"bytes=(\d*)-(\d*)")


class RangeHandler(http.server.SimpleHTTPRequestHandler):
    """SimpleHTTPRequestHandler plus byte-range support."""

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def end_headers(self):
        # Ranges are possible on everything we serve; say so.
        self.send_header("Accept-Ranges", "bytes")
        # Never let the browser cache a file you are actively editing.
        self.send_header("Cache-Control", "no-store, must-revalidate")
        super().end_headers()

    def send_head(self):
        rng = self.headers.get("Range")
        if not rng:
            return super().send_head()

        m = RANGE_RE.match(rng.strip())
        if not m:
            return super().send_head()

        path = self.translate_path(self.path)
        if os.path.isdir(path) or not os.path.exists(path):
            return super().send_head()

        size = os.path.getsize(path)
        start_s, end_s = m.group(1), m.group(2)

        if start_s == "":                       # "bytes=-500" → the last 500
            length = int(end_s or 0)
            start = max(0, size - length)
            end = size - 1
        else:
            start = int(start_s)
            end = int(end_s) if end_s else size - 1

        if start >= size:
            self.send_response(416)
            self.send_header("Content-Range", "bytes */%d" % size)
            self.end_headers()
            return None

        end = min(end, size - 1)
        length = end - start + 1

        f = open(path, "rb")
        f.seek(start)
        self.send_response(206)
        self.send_header("Content-Type", self.guess_type(path))
        self.send_header("Content-Range", "bytes %d-%d/%d" % (start, end, size))
        self.send_header("Content-Length", str(length))
        self.end_headers()

        # hand back a reader limited to exactly this slice
        return _Slice(f, length)

    def log_message(self, fmt, *args):
        # one quiet line per request, without the noisy timestamp block
        sys.stderr.write("  %s\n" % (fmt % args))


class _Slice:
    """A file object that stops after `remaining` bytes, so copyfile sends
    exactly the requested slice and not the rest of the file."""

    def __init__(self, f, remaining):
        self.f = f
        self.remaining = remaining

    def read(self, n=-1):
        if self.remaining <= 0:
            return b""
        if n < 0 or n > self.remaining:
            n = self.remaining
        data = self.f.read(n)
        self.remaining -= len(data)
        return data

    def close(self):
        self.f.close()


class Server(socketserver.ThreadingTCPServer):
    allow_reuse_address = True
    daemon_threads = True


if __name__ == "__main__":
    os.chdir(ROOT)
    url = "http://localhost:%d/" % PORT
    print("")
    print("   ============================================================")
    print("      Dr. Wessam Gouda  -  Math Platform")
    print("   ============================================================")
    print("")
    print("      Your page  %s" % url)
    print("      Lesson     %slesson.html?id=s1-u1-l1" % url)
    print("      Homework   %shomework.html?id=s1-u1-l1" % url)
    print("")
    print("      Video seeking works here (byte ranges supported).")
    print("      Keep this window open. Ctrl+C stops the server.")
    print("")
    threading.Timer(1.0, lambda: webbrowser.open(url)).start()
    try:
        with Server(("", PORT), RangeHandler) as httpd:
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n   Server stopped.\n")
    except OSError as e:
        print("\n   Could not start on port %d: %s" % (PORT, e))
        print("   Another server may already be running. Try: python serve.py 9000\n")
