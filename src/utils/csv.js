// CSV with quotes escaped and spreadsheet formulas neutralised (cells starting with = + - @ get a leading apostrophe).
export const cell=v=>{let s=String(v??"");if(typeof v!=="number"&&/^[=+\-@]/.test(s))s="'"+s;return '"'+s.replace(/"/g,'""')+'"';};
export const toCsv=rows=>rows.map(r=>r.map(cell).join(",")).join("\r\n");
