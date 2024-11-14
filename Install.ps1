#!/usr/bin/env pwsh
# Script to download, execute, and optionally delete the AnimeWaifuPS1.exe from GitHub releases

$ErrorActionPreference = 'Stop'

function Test-Admin {
    $currentUser = New-Object Security.Principal.WindowsPrincipal([Security.Principal.WindowsIdentity]::GetCurrent())
    return $currentUser.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
}

if (-not (Test-Admin)) {
    Write-Output "Please run PowerShell as an administrator to execute this script."
    Write-Output "Press Enter to exit..."
    [System.Console]::ReadLine() | Out-Null
    exit
}

# Define the download URL and paths
$DownloadUrl = "https://github.com/iamovi/AnimeWaifu/releases/download/waifuapps/AnimeWaifuPS1.exe"
$DownloadPath = "${env:USERPROFILE}\Downloads\AnimeWaifuPS1.exe"

# Download the .exe file
Write-Output "Starting download from $DownloadUrl..."
try {
    Invoke-WebRequest -Uri $DownloadUrl -OutFile $DownloadPath -UseBasicParsing
    Write-Output "Downloaded AnimeWaifuPS1.exe to $DownloadPath"
} catch {
    Write-Output "Error: Download failed. Please check your internet connection or the URL."
    exit
}

# Execute the downloaded .exe file
Write-Output "Executing AnimeWaifuPS1.exe..."
try {
    Start-Process -FilePath $DownloadPath -NoNewWindow -Wait
    Write-Output "AnimeWaifu executed successfully."
} catch {
    Write-Output "Error: Failed to execute AnimeWaifuPS1.exe."
    exit
}

# Confirm deletion
Write-Output "Would you like to delete the downloaded file? (Y/N)"
$confirmation = Read-Host
if ($confirmation -match '^[Yy]$') {
    try {
        Remove-Item -Path $DownloadPath -Force
        Write-Output "Downloaded file deleted successfully."
    } catch {
        Write-Output "Error: Failed to delete the downloaded file."
    }
} else {
    Write-Output "Downloaded file kept at $DownloadPath."
}

Write-Output "Process completed."
