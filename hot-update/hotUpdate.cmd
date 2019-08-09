cd %4
%5
if exist ./remote-assets (
rd /s /q remote-assets
) 
md remote-assets\res 
xcopy /s /q build\jsb-link\res remote-assets\res 
md remote-assets\src
xcopy /s /q build\jsb-link\src remote-assets\src
cd %3
%5
node version_generator.js -v %1 -u %2 -s ..\..\build\jsb-link -d ..\..\remote-assets