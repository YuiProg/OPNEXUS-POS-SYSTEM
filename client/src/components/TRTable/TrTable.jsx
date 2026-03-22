import React from "react";
import './TrTable.css';
import { Edit, Trash2 } from 'lucide-react';
import { SquarePen } from 'lucide-react';

//table wrapper headers and data
export class TableWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectAll: false,
            selected: new Array(props.data.length).fill(false)
        };
    }

    
    selectAll = () => {
        this.setState(prev => {
            const selectAll = !prev.selectAll;
            const selected = new Array(this.props.data.length).fill(selectAll);

            const selectedRows = selectAll ? this.props.data : [];
            this.props.onDelete(selectedRows);

            return { selectAll, selected };
        });
    }

    toggleRow = (index) => {
       
        this.setState(prev => {
            const selected = [...prev.selected];
            console.log(prev);
            selected[index] = !selected[index];

            const selectedRows = this.props.data.filter((_, i) => selected[i]);
            this.props.onDelete(selectedRows);

            return {
                selected,
                selectAll: selected.every(Boolean)
            };
        });
    }

    render() {
        const { 
            data, 
            hasSelect,
            hasAction,
            onDelete,
            onEdit
        } = this.props;
        const { selectAll, selected } = this.state;
        const headers = Object.keys(data[0]);

        return (
            <table style={{width: '100%'}}>
                <thead>
                    <tr>
                        {hasSelect && (
                            <th>
                                <input type="checkbox" checked={selectAll} onChange={this.selectAll} />
                            </th>
                        )}
                        {headers.map((h, i) => <th key={i}>{h}</th>)}
                        {hasAction && <th>Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    <Table
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
        );
    }
}

//table rows render
export class Table extends React.Component {

    render() {
        const { 
            data, 
            hasSelect, 
            selected, 
            toggleRow ,
            hasAction,
            CBD,
            CBE
        } = this.props;

        return (
            <>
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {hasSelect && (
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selected[rowIndex]}
                                    onChange={() => toggleRow(rowIndex)}
                                />
                            </td>
                        )}
                        {Object.values(row).map((value, colIndex) => (
                            <td key={colIndex}>{value}</td>
                        ))}
                        {hasAction && (
                            <td>
                                <button onClick={() => CBD(row)}><Trash2/></button>
                                <button onClick={() => CBE(row)}><SquarePen/></button>
                            </td>
                        )}
                    </tr>
                ))}
            </>
        );
    }
}
