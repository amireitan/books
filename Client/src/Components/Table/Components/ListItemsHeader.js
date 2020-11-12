import React, { useMemo } from 'react';

import {
    StyledTableCell,
    StyledTableHeadersRow,
} from "../Styled"

const ListItemsHeader = ({ columns, renderHeaderRows }) => {

    const header = useMemo(() => {
        return columns.map(column => 
            <StyledTableCell key={column.key} columnWidth={column.width} cellType="headers">
                {column.name}
            </StyledTableCell>
        )
    }, [columns]);

    return (
        <StyledTableHeadersRow data-id="StyledTableHeadersRow" rowType="headers">
            {
                renderHeaderRows 
                    ? renderHeaderRows()
                    : header
            }
        </StyledTableHeadersRow>
    );
};

export default ListItemsHeader;

