/*
* This file is part of the grid project
* (c) Basis Europe <eu@Basis.AgGridComponents.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

export function gw_getSupportedColumnTypes() {

  return {
    "basic-boolean": {
      cellRenderer: 'BasicBooleansRenderer',
      cellEditor: 'BasicBooleansEditor',
      filter: 'BasicBooleansFilter',
      floatingFilter: 'BasicBooleansFilter'
    },

    "basic-number": {
      cellRenderer: 'BasicNumbersRenderer',
      cellEditor: 'BasicNumbersEditor',
      filter: 'agNumberColumnFilter',
      filterParams: {
        inRangeInclusive: true,
      },
      floatingFilter: 'agNumberColumnFilter',
      floatingFilterParams: {
        inRangeInclusive: true,
      },
    }
  };
}

export function gw_getDefaultComponents() {

  return {
    // Booleans
    'BasicBooleansRenderer': Basis.AgGridComponents.BasicBooleansRenderer,
    'BasicBooleansEditor': Basis.AgGridComponents.BasicBooleansEditor,
    'BasicBooleansFilter': Basis.AgGridComponents.BasicBooleansFilter,

    // Numbers
    'BasicNumbersRenderer': Basis.AgGridComponents.BasicNumbersRenderer,
    'BasicNumbersEditor': Basis.AgGridComponents.BasicNumbersEditor
  }
}

export function gw_init(container, license, data, defaultOptions = {}) {

  if (agGrid.LicenseManager) agGrid.LicenseManager.setLicenseKey(license);

  let options = Object.assign(defaultOptions, {

    rowData: data,
    getDocument: () => $doc,
    columnTypes: gw_getSupportedColumnTypes(),
    components: gw_getDefaultComponents(),

    onRowDoubleClicked: gw_onRowDoubleClicked,
    onRowSelected: gw_onRowSelected,
    onSelectionChanged: gw_onSelectionChanged,

    onCellEditingStarted: gw_onCellEditingsEvent,
    onCellEditingStopped: gw_onCellEditingsEvent,
    onCellValueChanged: gw_onCellEditingsEvent,

    onRowEditingStarted: gw_onRowEditingsEvent,
    onRowEditingStopped: gw_onRowEditingsEvent,
    onRowValueChanged: gw_onRowEditingsEvent,

    getNodeChildDetails: (rowItem) => {

      const key = rowItem[gw_options["__getParentNodeId"]];
      if (rowItem.__node__children) {
        return {
          group: true,
          expanded: false,
          // provide ag-Grid with the children of this group
          children: rowItem.__node__children,
          // the key is used by the default group cellRenderer
          key: key ? key : -1
        };
      } else {
        return null;
      }
    }
  });

  if (gw_options.hasOwnProperty('__getRowNodeId')) {

    options.getRowNodeId = function (data) {
      let id = data[gw_options['__getRowNodeId']];
      id = id ? id : Math.random();
      return id;
    };
  }

  for (let i in options.columnDefs) {
    options.columnDefs[i].cellStyle = gw_cellStyler;
  }

  return new agGrid.Grid(container, options);
}


export function gw_setData(json, options) {

  const container = $doc.getElementById('grid');
  container.innerHTML = '';

  console.log(options)

  window.gw_meta = json[0].meta;
  window.AGridComponentsMetaConfig = gw_meta;

  window.gw_options = options
  window.gw_instance = gw_init(container, '', json, options);
}
