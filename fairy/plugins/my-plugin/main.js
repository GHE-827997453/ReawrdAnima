//FYI: https://github.com/Tencent/puerts/blob/master/doc/unity/manual.md

const cs = require('csharp');
const App = cs.FairyEditor.App;
const xml = cs.FairyEditor.XMLExtension.Load('./assets/main');
console.log('hello world', xml);