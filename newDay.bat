@echo off
cd %1
mkdir day%2

echo F|xcopy %CD%\_template\00.in %CD%\day%2\%2.in /q
echo F|xcopy %CD%\_template\00.sample %CD%\day%2\%2.sample /q
echo F|xcopy %CD%\_template\index.js %CD%\day%2\index.js /q
echo F|xcopy %CD%\_template\README.md %CD%\day%2\README.md /q