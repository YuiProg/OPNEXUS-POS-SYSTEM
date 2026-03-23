import React from "react";
import "./TrTable.css";
import { Trash2 } from "lucide-react";
import { SquarePen } from "lucide-react";

export class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectAll: false,
      selected: new Array(props.data.length).fill(false),
      productSelect: null,
    };
  }

  selectAll = () => {
    this.setState((prev) => {
      const selectAll = !prev.selectAll;
      const selected = new Array(this.props.data.length).fill(selectAll);
      const selectedRows = selectAll ? this.props.data : [];
      this.props.onDelete(selectedRows);
      return { selectAll, selected };
    });
  };

  toggleRow = (index) => {
    this.setState((prev) => {
      const selected = [...prev.selected];
      selected[index] = !selected[index];
      const selectedRows = this.props.data.filter((_, i) => selected[i]);
      this.props.onDelete(selectedRows);
      return {
        selected,
        selectAll: selected.every(Boolean),
      };
    });
  };

  render() {
    const { data, hasSelect, hasAction, onDelete, onEdit, isDetailed } = this.props;
    const { selectAll, selected } = this.state;
    const headers = Object.keys(data[0]);
    
    //const { header, hasButton, buttonInfo, CB } = isDetailed;

    return (
      <div className="table-wrapper">
        {isDetailed ? (
          <div className="table-header">
            <h1 className="table-title">{isDetailed.header}</h1>
            <div className="table-header-right">
              <div className="table-search">{isDetailed.search}</div>
              {isDetailed.hasButton && (
                <button className="table-new-btn" onClick={(e) => isDetailed.CB(e)}>
                  {isDetailed.buttonInfo}
                </button>
              )}
            </div>
          </div>
        ) : null}
        <table className="table">
          <thead className="table-thead">
            <tr className="table-thead-row">
              {hasSelect && (
                <th className="table-th table-th--check">
                  <input
                    className="table-checkbox"
                    type="checkbox"
                    checked={selectAll}
                    onChange={this.selectAll}
                  />
                </th>
              )}
              {headers.map((h, i) => (
                <th className="table-th" key={i}>{h}</th>
              ))}
              {hasAction && <th className="table-th table-th--action">Actions</th>}
            </tr>
          </thead>
          <tbody className="table-tbody">
            <TableData
              data={data}
              hasSelect={hasSelect}
              selected={selected}
              toggleRow={this.toggleRow}
              hasAction={hasAction}
              CBD={(e) => onDelete(e)}
              CBE={(e) => onEdit(e)}
            />
          </tbody>
        </table>
      </div>
    );
  }
}

export class TableData extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data, hasSelect, selected, toggleRow, hasAction, CBD, CBE } = this.props;

    return (
      <>
        {data.map((row, rowIndex) => (
          <tr
            className={`table-row ${selected[rowIndex] ? "table-row--selected" : ""}`}
            key={rowIndex}
          >
            {hasSelect && (
              <td className="table-td table-td--check">
                <input
                  className="table-checkbox"
                  type="checkbox"
                  checked={selected[rowIndex]}
                  onChange={() => toggleRow(rowIndex)}
                />
              </td>
            )}
            {Object.values(row).map((value, colIndex) => (
              <td className="table-td" key={colIndex}>{value}</td>
            ))}
            {hasAction && (
              <td className="table-td table-td--action">
                <button
                  className="table-action-btn table-action-btn--delete"
                  onClick={() => CBD(row)}
                >
                  <Trash2 size={15} />
                </button>
                <button
                  className="table-action-btn table-action-btn--edit"
                  onClick={() => CBE(row)}
                >
                  <SquarePen size={15} />
                </button>
              </td>
            )}
          </tr>
        ))}
      </>
    );
  }
}