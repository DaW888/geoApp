import {createStackNavigator, createAppContainer } from "react-navigation";
import Main from "./screens/Main";
import List from "./screens/List";
import Map from "./screens/Map";

const Root = createStackNavigator({
  Main: { screen: Main },
  List: { screen: List },
  Map: { screen: Map },
});

const App = createAppContainer(Root);

export default App;
