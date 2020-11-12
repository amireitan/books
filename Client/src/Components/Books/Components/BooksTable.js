import React, { useMemo } from 'react';
import Table from "../../Table/Table";
import {
    StyledTableCell, 
    StyledCellText,
    StyledTableBodyRow,
    StyledRowHover
} from "../../Table/Styled";

const COLUMNS = [
    {
        key: "title",
        name: "Title",
        width: 250
    },
    {
        key: "authors",
        name: "Authors",
        width: 200
    },
    {
        key: "publisher",
        name: "Publisher",
        width: 150
    },
    {
        key: "language_code",
        name: "Language",
        width: 100
    }
  ];

const mapColumnsByKey = columns => 
    columns.reduce((prev, col) => ({...prev, [col.key]: col}), {});



const Columns = ({rowData, mappedColumns}) => {

    return COLUMNS.map(({key, name}) => {
        const rowColVal = rowData[key];
        let value = rowColVal ? rowColVal : "N/A";

        return (
            <StyledTableCell key={value} columnWidth={mappedColumns[key].width}>
                <StyledCellText title={value}>{value}</StyledCellText>
            </StyledTableCell>
        );
    }, [])
}

const BooksTable = ({ data, isLoading, loadMoreItemsCB, onRowSelect }) => {
    const mappedColumns = useMemo(() => mapColumnsByKey(COLUMNS), [COLUMNS]);

    const renderBodyRows = ({rowData, rowStyle, index}) => {
        return (
            <StyledRowHover>
                <StyledTableBodyRow 
                    style={rowStyle}
                    backgroundColor={index % 2 === 0 ? "var(--light)" : "#ffffff"} 
                    onClick={() => onRowSelect ? onRowSelect(rowData) : null}
                >
                    <Columns rowData={rowData} mappedColumns={mappedColumns}/>
                </StyledTableBodyRow>
            </StyledRowHover>
        )
    }

    return (
        <Table 
            data={data} 
            columns={COLUMNS} 
            isLoading={isLoading}
            loadMoreItemsCB={loadMoreItemsCB}
            renderBodyRows={renderBodyRows}
        />
    )
};

export default React.memo(BooksTable);