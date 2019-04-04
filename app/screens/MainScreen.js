import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Linking,
  ActivityIndicator
} from "react-native";
import { Header, Button, Icon } from "react-native-elements";
import { observer } from "mobx-react/native";
import StorieStore from "../store/storiesStore";

const EmptyState = props => {
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator />
    </View>
  );
};

class ExpandableCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false
    };
  }

  toggle = () => {
    this.setState({ isVisible: !this.state.isVisible });
  };

  render() {
    const item = this.props.item;

    return (
      <View style={styles.items}>
        <TouchableOpacity
          style={{ flex: 1 }}
          key={`id-${item.id}`}
          activeOpacity={0.8}
          onPress={() => {
            Linking.openURL(item.url);
          }}
        >
          <Text
            style={{
              marginBottom: 1,
              fontSize: 24,
              fontWeight: "200"
            }}
          >
            {item.title}
          </Text>
          <Text style={{ marginBottom: 1 }}>by {item.by}</Text>
          {this.state.isVisible && (
            <Text style={{ marginBottom: 1 }}>
              Comment count: {item.kids ? item.kids.length : 0}
            </Text>
          )}
        </TouchableOpacity>
        <View
          style={{
            width: 30,
            justifyContent: "center"
          }}
        >
          <Button
            buttonStyle={{ backgroundColor: "transparent" }}
            onPress={this.toggle}
            icon={
              <Icon
                name={!this.state.isVisible ? "chevron-down" : "chevron-up"}
                type="octicon"
                color="#f4511e"
              />
            }
          />
        </View>
      </View>
    );
  }
}

@observer
export default class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  static navigationOptions = { header: null };

  render() {
    return (
      <View style={styles.container}>
        <Header
          containerStyle={styles.header}
          centerComponent={{
            text: "HACKER NEWS",
            style: { color: "#fff", fontSize: 18 }
          }}
        />
        <StatusBar barStyle="light-content" backgroundColor="#f4511e" />
        <View style={styles.list}>
          {StorieStore.stories.length > 0 ? (
            <FlatList
              onRefresh={StorieStore.refresh}
              refreshing={StorieStore.isRefreshing}
              data={StorieStore.stories}
              onEndReached={StorieStore.getMore}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => <ExpandableCell item={item} />}
            />
          ) : (
            <EmptyState text={"No available news"} />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  list: {
    flex: 1
  },
  header: {
    backgroundColor: "#f4511e"
  },
  items: {
    flexDirection: "row",
    flex: 1,
    borderBottomWidth: 0.5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomColor: "#595959"
  }
});
