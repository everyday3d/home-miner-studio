# Home Miner Studio — Deploy to HA & Bust Cache Wrapper
[CmdletBinding()]
param()

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
node (Join-Path $ScriptDir "deploy_ha.mjs")
