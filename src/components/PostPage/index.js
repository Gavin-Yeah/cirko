import {TabBar, ListView, NavBar} from 'antd-mobile';
import React from 'react'
import ReactDOM from 'react-dom'

const data = [
    {
        img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
        title: 'a',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
        img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
        title: 'b',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
        img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
        title: 'c',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
        img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
        title: 'd',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
        img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
        title: 'e',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
        img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
        title: 'f',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
        img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
        title: 'g',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
        img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
        title: 'h',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
        img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
        title: 'i',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
        img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
        title: 'j',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
        img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
        title: 'k',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
        img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
        title: 'l',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
];
const NUM_SECTIONS = 5;
const NUM_ROWS_PER_SECTION = 5;
let pageIndex = 0;

const dataBlobs = {};
let sectionIDs = [];
let rowIDs = [];
function genData(pIndex = 0) {
    for (let i = 0; i < NUM_SECTIONS; i++) {
        const ii = (pIndex * NUM_SECTIONS) + i;
        const sectionName = `Section ${ii}`;
        sectionIDs.push(sectionName);
        dataBlobs[sectionName] = sectionName;
        rowIDs[ii] = [];

        for (let jj = 0; jj < NUM_ROWS_PER_SECTION; jj++) {
            const rowName = `S${ii}, R${jj}`;
            rowIDs[ii].push(rowName);
            dataBlobs[rowName] = rowName;
        }
    }
    sectionIDs = [...sectionIDs];
    rowIDs = [...rowIDs];
}

class PostPage extends React.Component {
    constructor(props) {
        super(props);
        const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
        const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];

        const dataSource = new ListView.DataSource({
            getRowData,
            getSectionHeaderData: getSectionData,
            rowHasChanged: (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
        });

        this.state = {
            dataSource,
            isLoading: true,
            height: (document.documentElement.clientHeight * 3) / 4,
        };
    }

    componentDidMount() {
        const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).parentNode.offsetTop;
        setTimeout(() => {
            genData();
            this.setState({
                dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs),
                isLoading: false,
                height: hei,
            });
        }, 600);
    }

    onEndReached = (event) => {
        if (this.state.isLoading && !this.state.hasMore) {
            return;
        }
        console.log('reach end', event);
        this.setState({ isLoading: true });
        setTimeout(() => {
            genData(++pageIndex);
            this.setState({
                dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs),
                isLoading: false,
            });
        }, 1000);
    }

    render() {
        const separator = (sectionID, rowID) => (
            <div
                key={`${sectionID}-${rowID}`}
                style={{
                    backgroundColor: '#F5F5F9',
                    height: 8,
                    borderTop: '1px solid #ECECED',
                    borderBottom: '1px solid #ECECED',
                }}
            />
        );
        let index = data.length - 1;
        const row = (rowData, sectionID, rowID) => {
            if (index < 0) {
                index = data.length - 1;
            }
            const obj = data[index--];
            return (
                <div key={rowID} style={{ padding: '0 15px' }}>
                    <div
                        style={{
                            lineHeight: '50px',
                            color: '#888',
                            fontSize: 18,
                            borderBottom: '1px solid #F6F6F6',
                        }}
                    >{obj.title}</div>
                    <div style={{ display: 'flex', padding: '15px 0' }}>
                        <img style={{ height: '64px', marginRight: '15px' }} src={obj.img} alt="" />
                        <div style={{ lineHeight: 1 }}>
                            <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>{obj.des}</div>
                            <div><span style={{ fontSize: '30px', color: '#FF6E27' }}>35</span>¥ {rowID}</div>
                        </div>
                    </div>
                </div>
            );
        };    //homepage post的内容

        return (
<div>
    <NavBar
        mode="light"


        rightContent={
            <img style={{width:'30px'}} src="https://image.flaticon.com/icons/png/128/148/148781.png" alt=""/>


        }
    ><h1>CIRKO</h1></NavBar>
            <ListView
                ref={el => this.lv = el}
                dataSource={this.state.dataSource}

                renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
                    {this.state.isLoading ? 'Loading...' : 'Loaded'}
                </div>)}
                renderSectionHeader={sectionData => (
                    <div>{`Task ${sectionData.split(' ')[1]}`}</div>
                )}
                renderRow={row}
                renderSeparator={separator}
                style={{
                    height: this.state.height,
                    overflow: 'auto',
                }}
                pageSize={4}
                onScroll={() => { console.log('scroll'); }}
                scrollRenderAheadDistance={500}
                onEndReached={this.onEndReached}
                onEndReachedThreshold={10}
            />
</div>
        );
    }
}

export default PostPage;