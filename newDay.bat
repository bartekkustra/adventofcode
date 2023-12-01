@echo off
cd %1
mkdir day%2

echo F|xcopy %CD%\_template\00.in %CD%\day%2\%2.in /q
echo F|xcopy %CD%\_template\00.sample %CD%\day%2\%2.sample /q
echo F|xcopy %CD%\_template\index.ts %CD%\day%2\index.ts /q
echo F|xcopy %CD%\_template\index.test.ts %CD%\day%2\index.test.ts /q
echo F|xcopy %CD%\_template\README.md %CD%\day%2\README.md /q