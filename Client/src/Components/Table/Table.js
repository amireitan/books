import React, { useMemo, useCallback, Fragment } from 'react';
import styled from "styled-components";
import {AutoSizer} from "react-virtualized";
import ListItemsBody from "./Components/ListItemsBody";
import ListItemsHeader from "./Components/ListItemsHeader";


export const StyledTable = styled.div`
    position: relative;
    width: ${({width}) => width ? width + "px" : "100%"};
    flex-flow: row wrap;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #fff;
    border-radius: 5px;
    & > div {
        height: initial;
    }
    height: ${({height}) => height ? height : "unset"}
`;


const TableContent = ({
    data, 
    columns, 
    renderBodyRows, 
    loadMoreItemsCB,
    isLoading
}) => ({width, height})=> {
    return (
        <Fragment>
            <ListItemsHeader 
                data={data} 
                columns={columns} 
            /> 
            <ListItemsBody 
                maxHeight={height}
                data={data} 
                columns={columns}
                width={width}
                height={height}
                renderBodyRows={renderBodyRows}
                loadMoreItemsCB={loadMoreItemsCB}
                isLoading={isLoading}
            />
        </Fragment>
    )
}

const AutoSizerWithContent = (Content) => (
    <AutoSizer>
        {({height, width}) => <Content height={height} width={width}/>}
    </AutoSizer> 
);

const Table = ({ 
    isLoading, 
    data, 
    columns, 
    renderBodyRows, 
    loadMoreItemsCB, 
    style, 
    height = 400,
    isAutoSizer 
}) => {  

    const width = useMemo(() => {
        return columns.reduce((prev, col) => prev + col.width, 0)
    },[columns]);


    const getTableContent = useCallback(() => {
        return TableContent({
            data, 
            columns, 
            renderBodyRows, 
            loadMoreItemsCB, 
            width,
            height,
            isLoading
        })
    },[data, width, height, isLoading]);

    return (
        <StyledTable data-id="StyledTable" style={style} width={width} height={height}>
            {
                isAutoSizer 
                    ? <AutoSizerWithContent Content={getTableContent()}/>
                    : getTableContent()({width, height})     
            } 
        </StyledTable>
    )
}

export default Table;
