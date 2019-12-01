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
                    url: 'https://firebasestorage.googleapis.com/v0/b/my-project-1571785426296.appspot.com/o/images%2Fy9uUJHoPKJWXxdSBJpsHazKytPJ3_post_34_0.jpg?alt=media&token=ada06999-bcef-438c-8865-3923ef2e38c7'
                },
                    {
                        key: 'TekJlZRVCjLFexlOCuWn',
                        url: "https://firebasestorage.googleapis.com/v0/b/my-project-1571785426296.appspot.com/o/images%2Fy9uUJHoPKJWXxdSBJpsHazKytPJ3_post_36_0.jpg?alt=media&token=c70a463a-5cbb-4c34-a900-2b4cdcd1db1a"
                    },
                    {
                        key: 'IJOtIlfsYdTyaDTRVrLI',
                        url: 'https://firebasestorage.googleapis.com/v0/b/my-project-1571785426296.appspot.com/o/images%2Fy9uUJHoPKJWXxdSBJpsHazKytPJ3_post_35_0.jpg?alt=media&token=981f3a4c-7fbe-4055-80f0-c70728ca0674'
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
                    beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                    afterChange={index => console.log('slide to', index)}
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