import test from "node:test";import assert from "node:assert/strict";import {cell,toCsv} from "./csv.js";
test("quotes are doubled",()=>{assert.equal(cell('Say "hi"'),'"Say ""hi"""');});
test("spreadsheet formulas are neutralised",()=>{for(const x of ["=1+1","+5","-5x","@SUM(A1)"])assert.ok(cell(x).startsWith('"\''),x);});
test("numbers, including negatives, are left alone",()=>{assert.equal(cell(-5),'"-5"');assert.equal(cell(729),'"729"');});
test("rows join with CRLF",()=>{assert.equal(toCsv([["a","b"],[1,2]]),'"a","b"\r\n"1","2"');});
