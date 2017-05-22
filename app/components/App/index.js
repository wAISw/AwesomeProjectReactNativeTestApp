/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    ScrollView,
    View,
    Image
} from 'react-native';
import {BigImg} from '../../components/BigImg';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: []
        };
    }

    componentDidMount() {
        this.getImagesFromApi().done()
    }

    async getImagesFromApi() {
        try {
            let response = await fetch('https://s3.amazonaws.com/vgv-public/tests/astro-native/task.json');
            let responseJson = await response.json();
            this.setState({images: responseJson});
        } catch (error) {
            console.error(error);
        }
    }

    showBigImage(img) {
        let newState = Object.assign({}, this.state);
        newState.selectImg = img;
        this.setState(newState);
    }

    render() {
        let {images, selectImg} = this.state;
        return (
            <ScrollView>
                <Text style={styles.welcome}>
                    Welcome to React Native!
                </Text>
                {images.length > 0
                    ?
                    <View style={styles.imgList}>
                        {images.map((img, k) => <Image key={k}
                                                       onPress={this.showBigImage}
                                                       style={styles.img}
                                                       source={{uri: img.thumbnailUrl}}/>)}
                    </View>
                    : <View style={{flex: 1, justifyContent: 'space-between'}}>
                        <Image source={require('./loading.gif')}/>
                    </View>}
                {selectImg ? <BigImg {...selectImg}/> : null}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    imgList: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
    img: {
        minHeight: 150,
        minWidth: 150,
        margin: 5
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
