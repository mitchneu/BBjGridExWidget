/*
* This file is part of the grid project
* (c) Basis Europe <eu@basis.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

export function gw_startEditingCell(row, colKey, key, char) {
  
  gw_options.api.setFocusedCell(Number(row), colKey);
  gw_options.api.startEditingCell({
    rowIndex: Number(row),
    colKey: colKey,
    keyPress: Number(key),
    charPress: char
  });
}

export function gw_stopEditing(cancel) {
  gw_options.api.stopEditing(cancel);
}

export function gw_editNextCell(){
  gw_options.api.tabToNextCell();
};

export function gw_editPreviousCell() {
  gw_options.api.tabToPreviousCell();
}

export function gw_cellStyler(params) {

  let cdef = params.column.colDef.cellStyleDefaults || {};

  var meta = {};

  if (params.data && params.data.meta)
    meta = params.data.meta[params.column.colId] || {};

  let colStyle = {};

  if (meta["FGCOLOR"])
    colStyle.color = meta["FGCOLOR"];
  else
    if (cdef["FGCOLOR"])
      colStyle["color"] = cdef["FGCOLOR"];

  if (meta["BGCOLOR"])
    colStyle["background-color"] = meta["BGCOLOR"];
  else
    if (cdef["BGCOLOR"])
      colStyle["background-color"] = cdef["BGCOLOR"];

  if (meta["ALIGN"])
    colStyle["text-align"] = meta["ALIGN"];
  else
    if (cdef["ALIGN"])
      colStyle["text-align"] = cdef["ALIGN"];

  if (colStyle.color || colStyle["background-color"] || colStyle["text-align"]) {
    return colStyle;
  }
  else {
    return null;
  }
}

export function gw_getCellClass(params) {

  const field = params.colDef.field;
  
  if(params.data && params.data.hasOwnProperty('meta') ) {
    return (
      params.data.meta.hasOwnProperty(field) &&
      params.data.meta[field].hasOwnProperty('CELL_CLASS')
     ) ? params.data.meta[field].CELL_CLASS : `CELL_CLASS_${field}`
  }
}
