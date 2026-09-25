@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul 2>&1
title TeamSocLo Key Tool

set "VERSION=1.1.0"
set "GATEWAY=https://gpt.teamsoclo.site/v1"
set "MODEL=gpt-5.6-sol"
set "ENVVAR=TEAMSOCLO_API_KEY"
set "CODEX=%USERPROFILE%\.codex"
set "CFG=%CODEX%\config.toml"
set "BK=%CODEX%\.teamsoclo-backup"
set "MARKER=%CODEX%\.teamsoclo-applied.json"

echo.
echo   TeamSocLo Key Tool v%VERSION%
echo   Gateway: %GATEWAY%
echo   Model:   %MODEL%
echo.
echo   1^) Ap dung key
echo   2^) Reset cau hinh
echo   3^) Thoat
echo.
set "PICK="
set /p "PICK=Chon [1]: "
if "%PICK%"=="2" goto reset
if "%PICK%"=="3" goto done
goto apply

:apply
echo.
set "KEY="
set /p "KEY=Dan API key (sk-...): "
if not defined KEY goto nokey
echo !KEY! | findstr /b /c:"sk-" >nul
if errorlevel 1 goto badformat

echo.
echo   Dang kiem tra key voi gateway...
where curl >nul 2>&1
if errorlevel 1 (
  echo   [!] Khong tim thay curl, bo qua buoc kiem tra.
) else (
  set "CODE="
  for /f %%C in ('curl -s -o nul -m 20 -w "%%{http_code}" "%GATEWAY%/models" -H "Authorization: Bearer !KEY!"') do set "CODE=%%C"
  if "!CODE!"=="401" goto badkey
  if "!CODE!"=="403" goto badkey
  if not "!CODE!"=="200" goto nonet
  echo   Key hop le.
)

if not exist "%CODEX%" mkdir "%CODEX%"

rem Chi sao luu o lan cai dau tien.
if not exist "%MARKER%" (
  if exist "%CFG%" (
    if not exist "%BK%" mkdir "%BK%"
    copy /y "%CFG%" "%BK%\config.toml" >nul
    echo   Da sao luu config.toml cu vao %BK%
  )
)

rem Config moi: key nap qua bien moi truong TEAMSOCLO_API_KEY, khong ghi key vao file.
> "%CFG%" echo # TeamSocLo API - sinh boi TeamSocLo Key Tool v%VERSION%
>>"%CFG%" echo model = "%MODEL%"
>>"%CFG%" echo model_provider = "teamsoclo"
>>"%CFG%" echo.
>>"%CFG%" echo [model_providers.teamsoclo]
>>"%CFG%" echo name = "TeamSoclo"
>>"%CFG%" echo base_url = "%GATEWAY%"
>>"%CFG%" echo env_key = "%ENVVAR%"
>>"%CFG%" echo wire_api = "responses"
>>"%CFG%" echo requires_openai_auth = false

rem Set bien moi truong BEN cho user (song qua cac phien sau).
setx %ENVVAR% "!KEY!" >nul

> "%MARKER%" echo {"version":"%VERSION%","gateway":"%GATEWAY%","model":"%MODEL%"}

echo.
echo   Xong. Da ghi:
echo     %CFG%
echo     Bien moi truong %ENVVAR% (nguoi dung)
echo.
echo   QUAN TRONG: setx chi co hieu luc o phien MOI.
echo   THOAT HAN VS Code (dong het cua so) roi mo lai, dung Reload Window.
echo.
goto done

:reset
echo.
if exist "%BK%\config.toml" (
  copy /y "%BK%\config.toml" "%CFG%" >nul
  echo   Da khoi phuc config.toml truoc khi cai.
) else (
  if exist "%MARKER%" del /q "%CFG%" >nul 2>&1
)
reg delete "HKCU\Environment" /v %ENVVAR% /f >nul 2>&1
set "%ENVVAR%="
del /q "%MARKER%" >nul 2>&1
echo   Da go cau hinh TeamSocLo va bien %ENVVAR% khoi may.
echo   Tat han VS Code roi mo lai.
echo.
goto done

:nokey
echo.
echo   [X] Chua nhap key.
goto done

:badformat
echo.
echo   [X] Key phai bat dau bang sk-
goto done

:badkey
echo.
echo   [X] Gateway tu choi key nay (HTTP !CODE!^).
echo       Kiem tra lai tai https://gpt.teamsoclo.site/check
echo       Chua ghi gi vao may.
goto done

:nonet
echo.
echo   [X] Khong lien lac duoc gateway (HTTP !CODE!^).
echo       Kiem tra mang roi thu lai. Chua ghi gi vao may.
goto done

:done
echo.
pause
endlocal
