#!/usr/bin/env pwsh
# Script to download, execute, and delete the AnimeWaifu Apps from GitHub releases!

$ErrorActionPreference = 'Stop'

# Customizable Colors
$TitleColor = "Cyan"          # Color for titles and headings
$OptionColor = "Yellow"       # Color for options
$PromptColor = "Green"        # Color for prompts and user input
$SuccessColor = "Green"       # Color for success messages
$ErrorColor = "Red"           # Color for error messages
$InfoColor = "Gray"           # Color for informational messages
$DefaultColor = "White"       # Default text color

function Test-Admin {
    $currentUser = New-Object Security.Principal.WindowsPrincipal([Security.Principal.WindowsIdentity]::GetCurrent())
    return $currentUser.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
}

if (-not (Test-Admin)) {
    Write-Host "`nPlease run PowerShell as an administrator to execute this script.`n" -ForegroundColor $ErrorColor
    Write-Host "Press Enter to exit...`n" -ForegroundColor $InfoColor
    [System.Console]::ReadLine() | Out-Null
    exit
}

# Welcome Message
Write-Host "`nHi, Welcome to the AnimeWaifu App Installer!`n" -ForegroundColor $TitleColor

# Options for the user
Write-Host "Select the version of AnimeWaifu App to install:`n" -ForegroundColor $TitleColor
Write-Host "1) AnimeWaifu" -ForegroundColor $OptionColor
Write-Host "2) AnimeWaifu Basic" -ForegroundColor $OptionColor
Write-Host "3) AnimeWaifu Lite" -ForegroundColor $OptionColor
Write-Host "4) AW. QuickChat" -ForegroundColor $OptionColor
Write-Host "5) AnimeWaifu Cloud" -ForegroundColor $OptionColor
Write-Host "6) Cancel" -ForegroundColor $OptionColor
Write-Host "7) Visit Direct Download Site`n" -ForegroundColor $OptionColor

# Get the user's choice and validate
do {
    Write-Host "Enter your choice (1/2/3/4/5/6/7)" -ForegroundColor $PromptColor -NoNewline
    $choice = Read-Host " "
    switch ($choice) {
        "1" { $DownloadUrl = "https://github.com/iamovi/AnimeWaifu/releases/download/waifuappsv2/AnimeWaifuSetup.exe" }
        "2" { $DownloadUrl = "https://github.com/iamovi/AnimeWaifu/releases/download/waifuappsv2/AnimeWaifu_Basic_Setup.exe" }
        "3" { $DownloadUrl = "https://github.com/iamovi/AnimeWaifu/releases/download/waifuappsv2/AnimeWaifu_Lite_Setup.exe" }
        "4" { $DownloadUrl = "https://github.com/iamovi/AnimeWaifu/releases/download/waifuappsv2/QuickChatSetup.exe" }
        "5" { $DownloadUrl = "https://github.com/iamovi/AnimeWaifu/releases/download/waifuappsv2/AnimeWaifu_Cloud_Setup.exe" }
        "6" {
            Write-Host "Installation canceled by user.`n" -ForegroundColor $InfoColor
            exit
        }
        "7" {
            Write-Host "You have chosen to visit the direct download site.`n" -ForegroundColor $InfoColor
            Write-Host "Do you want to proceed? [Y/n]" -ForegroundColor $PromptColor -NoNewline
            $confirm = Read-Host " "
            if ($confirm -eq '' -or $confirm -eq 'Y' -or $confirm -eq 'y') {
                Write-Host "Opening the direct download site in browser...`n" -ForegroundColor $InfoColor
                Start-Process "https://iamovi.github.io/AnimeWaifu/install/"
                exit
            } else {
                Write-Host "Action canceled by user.`n" -ForegroundColor $InfoColor
                exit
            }
        }
        default {
            Write-Host "Invalid choice. Please enter 1, 2, 3, 4, 5, 6, or 7.`n" -ForegroundColor $ErrorColor
            continue
        }
    }
} while (-not $DownloadUrl)

# Define the path where the .exe will be downloaded
$DownloadPath = "${env:USERPROFILE}\Downloads\Install.exe"

# Confirm download with the user (default is Y)
Write-Host "You have chosen to download and install: $DownloadUrl`n" -ForegroundColor $InfoColor
Write-Host "Do you want to proceed with the download? [Y/n]" -ForegroundColor $PromptColor -NoNewline
$confirm = Read-Host " "
if ($confirm -eq '' -or $confirm -eq 'Y' -or $confirm -eq 'y') {
    try {
        # Download the .exe file
        Write-Host "Downloading from $DownloadUrl...`n" -ForegroundColor $InfoColor
        curl.exe -Lo $DownloadPath $DownloadUrl

        # Execute the downloaded .exe file and capture the exit code
        Write-Host "Executing the installer...`n" -ForegroundColor $InfoColor
        $process = Start-Process -FilePath $DownloadPath -NoNewWindow -Wait -PassThru

        # Check the exit code after execution
        if ($process.ExitCode -eq 0) {
            Write-Host "Installation completed successfully!`n" -ForegroundColor $SuccessColor
        } else {
            Write-Host "Installation was canceled or failed. Exit code: $($process.ExitCode)`n" -ForegroundColor $ErrorColor
        }
    }
    catch {
        Write-Host "An error occurred: $_`n" -ForegroundColor $ErrorColor
    }
    finally {
        # Cleanup the downloaded .exe file regardless of success or failure
        Write-Host "Cleaning up the downloaded installer...`n" -ForegroundColor $InfoColor
        if (Test-Path $DownloadPath) {
            Remove-Item -Path $DownloadPath -Force
        }
    }
} else {
    Write-Host "Download canceled by user.`n" -ForegroundColor $InfoColor
    exit
}

Write-Host "Script execution completed! Made by Maruf Ovi.`n" -ForegroundColor $TitleColor