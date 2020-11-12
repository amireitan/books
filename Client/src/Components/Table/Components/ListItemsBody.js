import React, { useCallback, useMemo, Fragment } from 'react';
import { FixedSizeList } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";

import Spinner from "../../Spinner/Spinner";
import get from "lodash/get";

import {
    StyledLoading,
    ListItemsContainer
} from "../Styled"


let requestCache = {}

const ListItemsBody = ({
    data=[], 
    renderBodyRows, 
    loadMoreItemsCB, 
    isLoading, 
    width, 
    height
}) => {
    const isItemLoaded = ({ index }) => !!data[index];

    const Row = useCallback(({index, style}) => {
        const rowData = data[index] 
        return ( 
            <div>
                {
                    isItemLoaded({index}) 
                        ?  renderBodyRows({rowData, rowStyle: style, index})
                        :  <StyledLoading>Loading...</StyledLoading>
                }
            </div>
        );
    }, [isItemLoaded, renderBodyRows, data]);


    const loadMoreItems = (visibleStartIndex, visibleStopIndex) => {
        const key = [visibleStartIndex, visibleStopIndex].join(":")

        if (requestCache[key]) {
            return
        }

        const length = visibleStopIndex - visibleStartIndex;

        const visibleRange = [...Array(length).keys()].map(x => x + visibleStartIndex);

        const itemsRetrieved = visibleRange.every(index => !!data[index])

        if (itemsRetrieved) {
            requestCache[key] = key
            return
        };

        return loadMoreItemsCB(visibleStartIndex, visibleStopIndex);
    }

    return (
        <ListItemsContainer>
            <InfiniteLoader
                isItemLoaded={isItemLoaded}
                loadMoreItems={loadMoreItems}
                itemCount={1000}
                data-id="InfiniteLoader"
            >
            {
                ({ onItemsRendered, ref }) => (
                    <Fragment>
                        {
                            isLoading 
                                ? <Spinner size="bg" 
                                        containerStyle={{margin: "30px"}}
                                        spinnerStyle={{dispaly: "block"}}
                                /> 
                                : null
                        }
                        {
                            !isLoading && !get(data, "length") 
                                ? (<div style={{color: "#444444", padding: "43px"}}>No Data</div>)
                                : null
                        }
                        {
                            !isLoading && 
                            get(data, "length") 
                            ?   <FixedSizeList
                                    className="List"
                                    height={height}
                                    width={width}
                                    style={{
                                        background: "#ggg"
                                    }}
                                    itemCount={data.length}
                                    onItemsRendered={onItemsRendered}
                                    itemSize={40}
                                    ref={ref}
                                >
                                {Row}
                                </FixedSizeList> 
                            : null
                        }
                    </Fragment>
                )
            }
            </InfiniteLoader>    
        </ListItemsContainer>
    )
};

export default ListItemsBody;
