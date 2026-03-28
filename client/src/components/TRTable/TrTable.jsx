import React from "react";
import "./TrTable.css";
import {
  Trash2,
  SquarePen,
  ChevronLeft,
  ChevronRight,
  Archive,
} from "lucide-react";
import PropTypes from "prop-types";
import Button from "../TRButton/Button";

//NOTE: SOME CODE HAVE BEEN MODIFIED BY AI (CLAUDE)
//NAG KANDA LETCHE LETCHE NA SIMULA NUNG NAGLAGAY PAGINATION HAHAHA
//PERO THE REST HERE IS STILL HUMAN MADE
//FUCK IT WE BALL
export class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectAll: false,
      selected: this.props.data
        ? new Array(props.data.length).fill(false)
        : [],
      productSelect: null,
      currentPage: 1,
    };
  }

  rowsPerPage = 10;

  componentDidUpdate(prevProps) {
    if (prevProps.search !== this.props.search) {
      this.setState({ currentPage: 1 });
    }

    // FIX: use reference check instead of length check so new array
    // spreads ([...products]) trigger a re-sync even at the same length
    if (prevProps.data !== this.props.data) {
      this.setState({
        selected: new Array(this.props.data.length).fill(false),
        selectAll: false,
      });
    }
  }

  selectAll = () => {
    this.setState((prev) => {
      const selectAll = !prev.selectAll;
      const selected = [...prev.selected];

      const startIndex = (prev.currentPage - 1) * this.rowsPerPage;
      const endIndex = startIndex + this.rowsPerPage;
      for (let i = startIndex; i < endIndex && i < this.props.data.length; i++) {
        selected[i] = selectAll;
      }

      const selectedRows = this.props.data.filter((_, i) => selected[i]);
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

  goToPage = (page) => {
    const totalPages = Math.ceil(this.props.data.length / this.rowsPerPage);
    if (page < 1 || page > totalPages) return;
    this.setState({ currentPage: page });
  };

  filterByValue(array, string) {
    return array.filter((o) =>
      Object.keys(o).some((k) =>
        String(o[k]).toLowerCase().includes(string.toLowerCase()),
      ),
    );
  }

  render() {
    const { data, hasSelect, hasAction, onDelete, onEdit, isDetailed, search, onView } =
      this.props;
    const { selectAll, selected, currentPage } = this.state;

    //for testing wag i remove. wag rin tanggalin yung comment sasabog to
    //console.log(this.filterByValue(data, search));

    const filteredData = search ? this.filterByValue(data, search) : data;

    const totalPages = filteredData
      ? Math.ceil(filteredData.length / this.rowsPerPage)
      : null;
    const startIndex = (currentPage - 1) * this.rowsPerPage;
    const paginatedData = filteredData
      ? filteredData.slice(startIndex, startIndex + this.rowsPerPage)
      : null;
    const paginatedSelected = paginatedData
      ? selected.slice(startIndex, startIndex + this.rowsPerPage)
      : null;

    
    const selectedRows = this.props.data.filter((_, i) => selected[i]);

    const headers =
      this.props.data && this.props.data.length > 0
        ? Object.keys(this.props.data[0])
        : [];

    const hasData = paginatedData && paginatedData.length > 0;

    // TODO: fix this later ps. what the fuck is this shit
    var pageNumbers = [];
    for (var i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    

    return (
      <div className="table-wrapper">
        {isDetailed && data ? (
          <div className="table-header">
            <h1 className="table-title">{isDetailed.header}</h1>
            <div className="table-header-right">
              <div className="table-search">{isDetailed.search}</div>
              {isDetailed.hasButton && isDetailed.hasDelete ? (
                <>
                <Button
                  error
                  text={isDetailed.buttonInfo}
                  onClick={(e) => isDetailed.CB(e)}
                />
                <Button
                  cancel
                  text={isDetailed.deleteBtnInfo}
                  onClick={() => isDetailed.CBD(selectedRows)}
                />
                </>
                
              ) : isDetailed.hasButton && (
                <Button
                  error
                  text={isDetailed.buttonInfo}
                  onClick={(e) => isDetailed.CB(e)}
                />
              )}
            </div>
          </div>
        ) : null}

        <div className="table-container">
          <table className="table">
            <thead className="table-thead">
              <tr className="table-thead-row">
                {hasSelect && data && data.length > 0 ? (
                  <th className="table-th table-th--check">
                    <input
                      className="table-checkbox"
                      type="checkbox"
                      checked={selectAll}
                      onChange={this.selectAll}
                    />
                  </th>
                ) : null}
                {headers.map((h, i) => (
                  <th className="table-th" key={i}>
                    {h.toUpperCase()}
                  </th>
                ))}
                {hasAction && data && data.length > 0 ? (
                  <th className="table-th table-th--action">ACTIONS</th>
                ) : null}
              </tr>
            </thead>
            <tbody className="table-tbody">
              {hasData ? (
                <TableData
                  data={paginatedData}
                  hasSelect={hasSelect}
                  selected={paginatedSelected}
                  toggleRow={(i) => this.toggleRow(startIndex + i)}
                  hasAction={hasAction}
                  CBD={(e) => onDelete(e)}
                  CBE={(e) => onEdit(e)}
                  onView={(e) => onView(e)}
                />
              ) : (
                <TableNoData
                  colSpan={
                    (headers ? headers.length : 0) +
                    (hasSelect ? 1 : 0) +
                    (hasAction ? 1 : 0)
                  }
                />
              )}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          <span className="pagination-info">
            {filteredData
              ? `showing ${Math.min(startIndex + 1, filteredData.length)} to ${Math.min(startIndex + this.rowsPerPage, filteredData.length)} of ${filteredData.length} results`
              : null}
          </span>
          <div className="pagination-controls">
            <button
              className="pagination-btn"
              onClick={() => this.goToPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={15} />
            </button>
            {pageNumbers.map((page) => {
              const showPage =
                page === 1 ||
                page === totalPages ||
                page === currentPage ||
                page === currentPage - 1 ||
                page === currentPage + 1;

              const showLeftDots =
                page === currentPage - 1 && currentPage - 1 > 2;
              const showRightDots =
                page === currentPage + 1 && currentPage + 1 < totalPages - 1;

              if (showLeftDots) {
                return (
                  <React.Fragment key={page}>
                    <span className="pagination-dots">...</span>
                    <button
                      className={
                        currentPage === page
                          ? "pagination-page pagination-page--active"
                          : "pagination-page"
                      }
                      onClick={() => this.goToPage(page)}
                    >
                      {page}
                    </button>
                  </React.Fragment>
                );
              }

              if (showRightDots) {
                return (
                  <React.Fragment key={page}>
                    <button
                      className={
                        currentPage === page
                          ? "pagination-page pagination-page--active"
                          : "pagination-page"
                      }
                      onClick={() => this.goToPage(page)}
                    >
                      {page}
                    </button>
                    <span className="pagination-dots">...</span>
                  </React.Fragment>
                );
              }

              if (showPage) {
                return (
                  <button
                    key={page}
                    className={
                      currentPage === page
                        ? "pagination-page pagination-page--active"
                        : "pagination-page"
                    }
                    onClick={() => this.goToPage(page)}
                  >
                    {page}
                  </button>
                );
              }
              return null;
            })}

            <button
              className="pagination-btn"
              onClick={() => this.goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export class TableData extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data, hasSelect, selected, toggleRow, hasAction, CBD, CBE, onView } =
      this.props;

    return (
      <>
        {data.map((row, rowIndex) => (
          <tr
            className={
              selected[rowIndex] === true
                ? "table-row table-row--selected"
                : "table-row"
            }
            key={rowIndex}
          >
            {hasSelect ? (
              <td className="table-td table-td--check">
                <input
                  className="table-checkbox"
                  type="checkbox"
                  checked={selected[rowIndex] ?? false}
                  onChange={() => toggleRow(rowIndex)}
                />
              </td>
            ) : null}
            {Object.values(row).map((value, colIndex) => (
              <td className="table-td" key={colIndex}>
                {colIndex === 0 ? <strong style={{cursor: 'pointer'}} onClick={() => onView(row)}>{value}</strong> : value}
              </td>
            ))}
            {hasAction ? (
              <td className="table-td table-td--action">
                <button
                  className="table-action-btn table-action-btn--edit"
                  onClick={() => CBE(row)}
                >
                  <SquarePen size={20} />
                </button>
                <button
                  className="table-action-btn table-action-btn--delete"
                  onClick={() => CBD(row)}
                >
                  <Trash2 size={20} />
                </button>
              </td>
            ) : null}
          </tr>
        ))}
      </>
    );
  }
}

export class TableNoData extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <tr>
        <td colSpan={this.props.colSpan} className="table-td--nodata">
          <div className="no-data-wrapper">
            <Archive size={32} strokeWidth={1.5} className="no-data-icon" />
            <p className="no-data-title">No data found :(</p>
          </div>
        </td>
      </tr>
    );
  }
}

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  hasSelect: PropTypes.bool,
  hasAction: PropTypes.bool,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  search: PropTypes.string,
  isDetailed: PropTypes.shape({
    header: PropTypes.string,
    search: PropTypes.node,
    hasButton: PropTypes.bool,
    buttonInfo: PropTypes.string,
    CB: PropTypes.func,
  }),
};

TableData.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  hasSelect: PropTypes.bool,
  hasAction: PropTypes.bool,
  selected: PropTypes.arrayOf(PropTypes.bool),
  toggleRow: PropTypes.func,
  CBD: PropTypes.func,
  CBE: PropTypes.func,
};

TableNoData.propTypes = {
  colSpan: PropTypes.number,
};