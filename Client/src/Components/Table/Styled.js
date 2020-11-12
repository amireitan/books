import React from 'react';
import styled from "styled-components";

export const tableStyles = {
    table_header_background: "#545b62",
    table_body_background: "#ffffff",
    table_header_border: "#1565C0",
    table_cells_border: "#dedede",
    row_bg: "#f4f2f1" 
};

export const StyledTableRow = styled.div`
    display: flex;
    flex-flow: row nowrap;
    transition: background 0.2s ease;
`;

export const StyledTableHeadersRow = styled(StyledTableRow)`
    display: flex;
    flex-flow: row nowrap;
    width: 100%;
    color: #ffffff;
    background: ${() => tableStyles.table_header_background};
`;

export const StyledTableBodyRow = styled(StyledTableRow)`
    background: ${({backgroundColor}) => backgroundColor 
        ? backgroundColor 
        : tableStyles.table_body_background
    };
    color: #292929;
    cursor: pointer;
`;

export const StyledRowHover = styled.div`
    &:hover div {
        background: #676767;
        color: #ffffff;
        font-weight: 500;
    }
    &:active div {
        background: #cdcdcd;
    }
`;

export const StyledCellText = styled.span`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline;
`

export const StyledTableCell = styled.div`
    min-width: ${({columnWidth}) => `${columnWidth}px`};
    max-width: ${({columnWidth}) => `${columnWidth}px`};
    overflow-wrap: break-word;
    font-size: ${({cellType}) => cellType === "headers" ?  "inherit" : "12px"};
    border: ${() => `1px solid ${tableStyles.table_cells_border}`};
    padding: 10px;    
    display: flex;
    white-space: nowrap;
    align-items: center;
`;

export const ListItemsContainer = styled.div`
    overflow:auto;
    background: #ffffff;
    height: 100%;
    display: flex;
    justify-content: center;
    max-height: ${(maxHeight) => maxHeight ? maxHeight : 'auto'}
`;

export const StyledLoading = styled.div`
    height: 100%;
    width: 100%;
    padding: 10px;   
    color: #292929;
    background: #fff;
    text-align: center;
    border: ${() => `1px solid ${tableStyles.table_cells_border}`};
`;
