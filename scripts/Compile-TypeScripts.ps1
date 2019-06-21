#
# This compiles TypeScript files.
#

Param(
    [string] [Parameter(Mandatory=$true)] $SourceDirectory
)

cd $SourceDirectory

Get-ChildItem *.ts -File -Recurse | Where-Object {
    $_.FullName -notlike "*node_modules*"
} | ForEach-Object {
    tsc $_.FullName
}
