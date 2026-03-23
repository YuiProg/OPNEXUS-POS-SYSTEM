import React from "react";
import "./TrTable.css";
import { Trash2, SquarePen, ChevronLeft, ChevronRight } from "lucide-react";


//NOTE: SOME CODE HAVE BEEN MODIFIED BY AI (CLAUDE)
//NAG KANDA LETCHE LETCHE NA SIMULA NUNG NAGLAGAY AKO PAGINATION HAHAHA
//PERO THE REST HERE IS STILL HUMAN MADE
//FUCK IT WE BALL
export class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectAll: false,
      selected: this.props.data ? new Array(props.data.length).fill(false) : null,
      productSelect: null,
      currentPage: 1,
    };
  }

  rowsPerPage = 10;

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

  goToPage = (page) => {
    const totalPages = Math.ceil(this.props.data.length / this.rowsPerPage);
    if (page < 1 || page > totalPages) return;
    this.setState({ currentPage: page });
  };

  filterByValue(array, string) {
    return array.filter(o =>
      Object.keys(o).some(k =>
        String(o[k]).toLowerCase().includes(string.toLowerCase())
      )
    );
  }

  render() {
    const { data, hasSelect, hasAction, onDelete, onEdit, isDetailed, search } = this.props;
    const { selectAll, selected, currentPage } = this.state;

    //for testing wag i remove. wag rin tanggalin yung comment sasabog to
    //console.log(this.filterByValue(data, search));

    //some pagination shit na generated na ng ai
    const totalPages = this.props.data ? Math.ceil(data.length / this.rowsPerPage) : null;
    const startIndex = (currentPage - 1) * this.rowsPerPage;
    const paginatedData = this.props.data ?  data.slice(startIndex, startIndex + this.rowsPerPage) : null;
    const paginatedSelected = paginatedData ? selected.slice(startIndex, startIndex + this.rowsPerPage) : null;

    const headers = this.props.data ?  Object.keys(data[0]) : null;

    // TODO: fix this later ps. what the fuck is this shit
    var pageNumbers = []
    for (var i = 1; i <= totalPages; i++) {
      pageNumbers.push(i)
    }

    return (
      <div className="table-wrapper">
        {isDetailed && data ? (
          <div className="table-header">
            <h1 className="table-title">{isDetailed.header}</h1>
            <div className="table-header-right">
              <div className="table-search">{isDetailed.search}</div>
              {isDetailed.hasButton == true ? (
                <button className="table-new-btn" onClick={(e) => isDetailed.CB(e)}>
                  {isDetailed.buttonInfo}
                </button>
              ) : null}
            </div>
          </div>
        ) : null}
        <table className="table">
          <thead className="table-thead">
            <tr className="table-thead-row">
              {hasSelect && data == true ? (
                <th className="table-th table-th--check">
                  <input
                    className="table-checkbox"
                    type="checkbox"
                    checked={selectAll}
                    onChange={this.selectAll}
                  />
                </th>
              ) : null}
              {this.props.data && (
                headers.map((h, i) => (
                <th className="table-th" key={i}>{h.toUpperCase()}</th>
              ))
              )}
              {hasAction && data == true ? <th className="table-th table-th--action">Actions</th> : null}
            </tr>
          </thead>
          <tbody className="table-tbody">
            <TableData
              data={search ? this.filterByValue(data, search) :paginatedData}
              hasSelect={hasSelect}
              selected={paginatedSelected}
              toggleRow={(i) => this.toggleRow(startIndex + i)}
              hasAction={hasAction}
              CBD={(e) => onDelete(e)}
              CBE={(e) => onEdit(e)}
            />
          </tbody>
        </table>

        <div className="pagination">
          <span className="pagination-info">
            {this.props.data ? `showing ${startIndex + 1} to ${Math.min(startIndex + this.rowsPerPage, data.length)} of ${data.length} results` : null }
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

              const showLeftDots  = page === currentPage - 1 && currentPage - 1 > 2;
              const showRightDots = page === currentPage + 1 && currentPage + 1 < totalPages - 1;

              if (showLeftDots) {
                return (
                  <React.Fragment key={page}>
                    <span className="pagination-dots">...</span>
                    <button
                      className={currentPage === page ? "pagination-page pagination-page--active" : "pagination-page"}
                      onClick={() => this.goToPage(page)}
                    >
                      {page}
                    </button>
                  </React.Fragment>
                )
              }

              if (showRightDots) {
                return (
                  <React.Fragment key={page}>
                    <button
                      className={currentPage === page ? "pagination-page pagination-page--active" : "pagination-page"}
                      onClick={() => this.goToPage(page)}
                    >
                      {page}
                    </button>
                    <span className="pagination-dots">...</span>
                  </React.Fragment>
                )
              }

              if (showPage) {
                return (
                  <button
                    key={page}
                    className={currentPage === page ? "pagination-page pagination-page--active" : "pagination-page"}
                    onClick={() => this.goToPage(page)}
                  >
                    {page}
                  </button>
                )
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
    const { data, hasSelect, selected, toggleRow, hasAction, CBD, CBE } = this.props;

    // if (!data) {
    //   return <div>nothing</div>
    // }

    return (
      <>
        {this.props.data ? (
          data.map((row, rowIndex) => {
            return (
              <tr
                className={selected[rowIndex] == true ? "table-row table-row--selected" : "table-row"}
                key={rowIndex}
              >
                {hasSelect == true ? (
                  <td className="table-td table-td--check">
                    <input
                      className="table-checkbox"
                      type="checkbox"
                      checked={selected[rowIndex]}
                      onChange={() => toggleRow(rowIndex)}
                    />
                  </td>
                ) : null}
                {Object.values(row).map((value, colIndex) => (
                  <td className="table-td" key={colIndex}>{value}</td>
                ))}
                {hasAction == true ? (
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
                ) : null}
              </tr>
            )
          })
        ) : (
          //PAG WALANG DATA NA NAIPASA SA PARENT
          <div>
            <TableNoData/>
          </div>
        )}
      </>
    );
  }
}

//NO DATA CONTAINER
export class TableNoData extends React.Component {
  constructor (props) {
    super(props);
  }
  //TODO TOMORROW
  render () {
    return (
      <div>
        <p>no data found</p>
      </div>
    );
  }
}