# react-native-responsive-app-modal
[![Codelab](http://www.codelabsys.com/images/logo.png)](http://www.codelabsys.com/) 

Create responsive modals easily by auto injecting it to the app root.
## Dependencies
* [react-native-modalbox](https://github.com/maxs15/react-native-modalbox)
*  [react-native-root-siblings](https://github.com/magicismight/react-native-root-siblings)

## Installation

[![NPM](https://nodei.co/npm/react-native-responsive-app-modal.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/react-native-responsive-app-modal/)

```
npm install --save  react-native-responsive-app-modal
```

## Properties

| Prop  | Type | Description |
| :------------ | :---------------:| :-----|
| screenHeight| `number` | Used for modal dimensions calculation (Note: users of react-native>=0.43 you don't have to send this property)    |
| screenWidth| `number` | Used for modal dimensions calculation (Note: users of react-native>=0.43 you don't have to send this property)|
| verticalMargin| `number` | Define spacing between the modal and the screen edges   |
| horizontalMargin| `number` | Define spacing between the modal and the screen edges   |
| sizeMatching| `string`('content' or 'screen') | define if the modal size should match the screen size or the size of its content   |

Note that for  react-native<0.43 you should update the `screenHeight` and `screenWidth` whenever the device rotates.

The Modal Also recieves all the props of [react-native-modalbox](https://github.com/maxs15/react-native-modalbox), checkout their repository for the full list.

## Usage

```js
import ResponsiveAppModal from 'react-native-responsive-app-modal'
import React, { Component } from 'react';
import { View,TouchableOpacity, Text} from 'react-native';


var Parent = React.createClass({
    render: function () {
        return (
            <View style={{ height: 200, width: 200, justifyContent: "center", alignSelf: "center", borderWidth: 1 }}>
                <ChildComponent />
            </View>
        );
    }
});

var ChildComponent = React.createClass({
    getInitialState: function () {
        return {
            isOpen: false,
        };
    },
    render: function () {
        return (
            <View>
                <TouchableOpacity style={{ backgroundColor: "#ddd",padding:10 }} onPress={() => { this.setState({ isOpen: true }) }}>
                    <Text style={{fontSize:18,textAlign:"center"}}>Show Modal</Text>
                </TouchableOpacity>
                <ResponsiveModal sizeMatching="content"
                    isOpen={this.state.isOpen} onClosed={() => { this.setState({ isOpen: false }) }} >
                    <View style={{ height: 200, backgroundColor: "red" }}>
                    </View>
                </ResponsiveModal>
            </View>
        );
    }
});

```
