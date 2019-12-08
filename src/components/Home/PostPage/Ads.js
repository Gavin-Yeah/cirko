import React, { Component } from 'react';
import { Carousel, WingBlank } from "antd-mobile";

class Ads extends Component {
    state={
        imgHeight:'176px',
        ads: ['1', '2', '3'],
    }

    componentDidMount() {
      this.timeout = setTimeout(() => {
            this.setState({
                ads: [{
                    key: 'AiyWuByWklrrUDlFignR',
                    url: 'https://firebasestorage.googleapis.com/v0/b/my-project-1571785426296.appspot.com/o/cirko.png?alt=media&token=502ec4ab-3ecc-4d0f-94d3-1d1594715279'
                },
                    {
                        key: 'TekJlZRVCjLFexlOCuWn',
                        url: "https://firebasestorage.googleapis.com/v0/b/my-project-1571785426296.appspot.com/o/cirko2.png?alt=media&token=6648405e-50af-4c87-9fe0-51693811c368"
                    },
                    {
                        key: 'IJOtIlfsYdTyaDTRVrLI',
                        url: 'https://firebasestorage.googleapis.com/v0/b/my-project-1571785426296.appspot.com/o/cirko-2.png?alt=media&token=0bd8ac15-964a-4ce5-926c-f69b0de9f1a1'
                    }],

            });
        }, 100);
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    render() {
        return (
            <WingBlank style={{marginTop:'10vh',textAlign:'center'}}>
                <Carousel
                    autoplay={true}
                    infinite
                    // beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                    // afterChange={index => console.log('slide to', index)}
                >
                    {this.state.ads.map(val => (
                        <a
                            key={val.key}
                            href="http://www.uci.edu"
                            style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                        >
                            <img
                                src={val.url}
                                alt=""
                                style={{ width: '50%', verticalAlign: 'top' }}
                                onLoad={() => {
                                    // fire window resize event to change height
                                    window.dispatchEvent(new Event('resize'));
                                    this.setState({ imgHeight: 'auto' });
                                }}
                            />
                        </a>
                    ))}
                </Carousel>
            </WingBlank>
        );
    }
}

export default Ads;