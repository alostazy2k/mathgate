@echo off
REM ===========================================================================
REM  Dr. Wessam Gouda - Math Platform
REM  Double-click this file to run the site properly on http://localhost
REM
REM  Why this exists: opening index.html directly (file://) makes the browser
REM  treat the page as an untrusted origin and block localStorage, so progress,
REM  quiz scores and the homework gate silently stop working. Serving over
REM  http://localhost behaves exactly like the real site will.
REM
REM  Messages are in English on purpose - the Windows console mangles Arabic.
REM ===========================================================================

cd /d "%~dp0"
set "PORT=8080"
set "PAGE=index.html"

REM --- find Python: the py launcher first, then plain python -----------------
REM  (written flat, not inside parentheses: %errorlevel% inside a block is
REM   expanded when the block is parsed, i.e. before the command has run)
set "PY="
where py >nul 2>nul
if not errorlevel 1 set "PY=py"
if defined PY goto :found
where python >nul 2>nul
if not errorlevel 1 set "PY=python"
:found

if not defined PY goto :nopython

title Math Platform - local server on port %PORT%
echo.
echo   ============================================================
echo      Dr. Wessam Gouda  -  Math Platform
echo   ============================================================
echo.
echo      Your page  http://localhost:%PORT%/
echo      Lesson     http://localhost:%PORT%/lesson.html?id=u1-l1
echo      Homework   http://localhost:%PORT%/homework.html?id=u1-l1
echo.
echo      Add  ?dev=1  to either URL for the reset button.
echo.
echo      Keep this window open while you work.
echo      Press Ctrl+C to stop the server.
echo.

REM --- open the browser a couple of seconds after the server is up ----------
start "" /b cmd /c "timeout /t 2 >nul & explorer http://localhost:%PORT%/%PAGE%"

%PY% -m http.server %PORT%
goto :eof

:nopython
echo.
echo   Python was not found on this computer.
echo   Install it from  https://www.python.org/downloads/
echo   and tick "Add Python to PATH" during setup.
echo.
pause
