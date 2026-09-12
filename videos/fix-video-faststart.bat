@echo off
REM ===========================================================================
REM  Math Platform  -  Fast Start fixer
REM  Dr. Wessam Gouda
REM ===========================================================================
REM  WHAT THIS DOES
REM  An MP4 keeps an index (the "moov atom") that says where every second of
REM  the video lives. Screen recorders write that index at the END of the file.
REM  A browser cannot jump to minute 12 until it has read the index, so with
REM  the index at the end it must download the WHOLE video first - which is why
REM  seeking feels broken or very slow.
REM
REM  This moves the index to the front. It does NOT re-encode: the video and
REM  audio are copied byte for byte, so there is zero quality loss and it takes
REM  seconds, not minutes.
REM
REM  HOW TO USE
REM  Put this file inside the "videos" folder and double-click it. It finds
REM  every .mp4 in every lesson folder underneath and fixes them all.
REM
REM  SAFETY
REM  The original of each file is kept in an "_originals" folder next to it.
REM  A file is only replaced AFTER the new one is written successfully. If
REM  anything goes wrong, your original is still there.
REM
REM  Messages are in English on purpose - the Windows console mangles Arabic.
REM ===========================================================================

setlocal enabledelayedexpansion
cd /d "%~dp0"

echo.
echo   ============================================================
echo      Fast Start fixer  -  Math Platform
echo   ============================================================
echo.

REM --- is ffmpeg available? ---------------------------------------------
where ffmpeg >nul 2>nul
if errorlevel 1 (
  echo   ffmpeg was not found.
  echo.
  echo   Open PowerShell and run:  ffmpeg -version
  echo   If that fails too, ffmpeg is not installed or not on the PATH.
  echo.
  pause
  exit /b 1
)

set /a DONE=0
set /a FAILED=0
set /a SKIPPED=0

for /r %%F in (*.mp4) do (

  REM skip anything already sitting in a backup folder
  echo %%~dpF| find /i "_originals" >nul
  if errorlevel 1 (

    echo   Processing: %%~nxF
    set "SRC=%%F"
    set "TMP=%%~dpnF.faststart.tmp.mp4"
    set "BAK=%%~dpF_originals"

    ffmpeg -v error -y -i "%%F" -c copy -movflags +faststart "!TMP!"

    if exist "!TMP!" (
      REM make sure the new file is not empty before touching the original
      for %%S in ("!TMP!") do set "NEWSIZE=%%~zS"
      if !NEWSIZE! GTR 0 (
        if not exist "!BAK!" mkdir "!BAK!"
        move /y "%%F" "!BAK!\%%~nxF" >nul
        move /y "!TMP!" "%%F" >nul
        echo      done.
        set /a DONE+=1
      ) else (
        del "!TMP!" >nul 2>nul
        echo      FAILED - output was empty, original untouched.
        set /a FAILED+=1
      )
    ) else (
      echo      FAILED - ffmpeg produced nothing, original untouched.
      set /a FAILED+=1
    )

  ) else (
    set /a SKIPPED+=1
  )
)

echo.
echo   ------------------------------------------------------------
echo      Fixed:   !DONE!
echo      Failed:  !FAILED!
echo      Skipped: !SKIPPED!   (files already in _originals)
echo   ------------------------------------------------------------
echo.
echo   Your original files are kept in the "_originals" folders.
echo   Check the videos play, then you can delete those folders.
echo.
pause