@echo off
cd 2020
mkdir day%1

echo F|xcopy %CD%\_template\0.in %CD%\day%1\%1.in /q
echo F|xcopy %CD%\_template\0.sample %CD%\day%1\%1.sample /q
echo F|xcopy %CD%\_template\index.js %CD%\day%1\index.js /q
echo F|xcopy %CD%\_template\README.md %CD%\day%1\README.md /q