#!/usr/bin/env pwsh
# Script to download, execute, and delete the AnimeWaifuPS1.exe from GitHub releases

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

# Define the download URL
$DownloadUrl = "https://github.com/iamovi/AnimeWaifu/releases/download/waifuapps/AnimeWaifuPS1.exe"

# Define the path where the .exe will be downloaded
$DownloadPath = "${env:USERPROFILE}\Downloads\AnimeWaifuPS1.exe"

# Download the .exe file
curl.exe -Lo $DownloadPath $DownloadUrl

# Execute the downloaded .exe file
Start-Process -FilePath $DownloadPath -NoNewWindow -Wait

# Delete the downloaded .exe file
Remove-Item -Path $DownloadPath -Force

Write-Output "AnimeWaifu was downloaded, executed successfully from ${DownloadUrl}"

# .