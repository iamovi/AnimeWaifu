#!/usr/bin/env pwsh
# Script to download, execute, and delete the AnimeWaifuPS1.exe and QuickChatSetup.exe from GitHub releases

$ErrorActionPreference = 'Stop'

function Test-Admin {
    $currentUser = New-Object Security.Principal.WindowsPrincipal([Security.Principal.WindowsIdentity]::GetCurrent())
    return $currentUser.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
}

if (-not (Test-Admin)) {
    Write-Host "Please run PowerShell as an administrator to execute this script.`n"
    Write-Host "Press Enter to exit...`n"
    [System.Console]::ReadLine() | Out-Null
    exit
}

# Options for the user
Write-Host "Select the version of AnimeWaifu or QuickChat to download and install:`n"
Write-Host "1) AnimeWaifu`n"
Write-Host "2) AnimeWaifu Basic`n"
Write-Host "3) AnimeWaifu Lite`n"
Write-Host "4) AW. QuickChat`n"
Write-Host "5) Cancel`n"

# Get the user's choice and validate
do {
    $choice = Read-Host "Enter your choice (1/2/3/4/5)"
    switch ($choice) {
        "1" { $DownloadUrl = "https://github.com/iamovi/AnimeWaifu/releases/download/waifuappsv2/AnimeWaifuSetup.exe" }
        "2" { $DownloadUrl = "https://github.com/iamovi/AnimeWaifu/releases/download/waifuappsv2/AnimeWaifu_Basic_Setup.exe" }
        "3" { $DownloadUrl = "https://github.com/iamovi/AnimeWaifu/releases/download/waifuappsv2/AnimeWaifu_Lite_Setup.exe" }
        "4" { $DownloadUrl = "https://github.com/iamovi/AnimeWaifu/releases/download/waifuappsv2/QuickChatSetup.exe" }
        "5" {
            Write-Host "Installation canceled by user.`n"
            exit
        }
        default {
            Write-Host "Invalid choice. Please enter 1, 2, 3, 4, or 5.`n"
            continue
        }
    }
} while (-not $DownloadUrl)

# Define the path where the .exe will be downloaded
$DownloadPath = "${env:USERPROFILE}\Downloads\Install.exe"

try {
    # Download the .exe file
    Write-Host "Downloading from $DownloadUrl...`n"
    curl.exe -Lo $DownloadPath $DownloadUrl

    # Execute the downloaded .exe file and capture the exit code
    Write-Host "Executing the installer...`n"
    $process = Start-Process -FilePath $DownloadPath -NoNewWindow -Wait -PassThru

    # Check the exit code after execution
    if ($process.ExitCode -eq 0) {
        Write-Host "Installation completed successfully!`n"
    } else {
        Write-Host "Installation was canceled or failed. Exit code: $($process.ExitCode)`n"
    }
}
catch {
    Write-Host "An error occurred: $_`n"
}
finally {
    # Cleanup the downloaded .exe file regardless of success or failure
    Write-Host "Cleaning up the downloaded installer...`n"
    if (Test-Path $DownloadPath) {
        Remove-Item -Path $DownloadPath -Force
    }
}

Write-Host "Script execution completed! Made by Maruf Ovi.`n"
