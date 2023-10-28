import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ToastAndroid,
} from "react-native";

export default function App() {
  const [id, setID] = useState(1);

  const [getName, setGetName] = useState("");
  const [getSalary, setGetSalary] = useState("");
  const [getAge, setGetAge] = useState("");

  const [name, setName] = useState("");
  const [salary, setSalary] = useState("");
  const [age, setAge] = useState("");

  const [showMethod, setShowMethod] = useState(null);

  const fetchUser = (id) => {
    fetch(`https://dummy.restapiexample.com/api/v1/employee/${id}`)
      .then((response) => response.json())
      .then(
        (json) =>
          {
            setGetName(json.data.employee_name);
            setGetSalary(json.data.employee_salary);
            setGetAge(json.data.employee_age);
          }
      );
  };

  const AddUser = (name, salary, age, id) => {
    fetch("https://dummy.restapiexample.com/api/v1/create", {
      method: "POST",
      body: {
        employee_name: name,
        employee_salary: salary,
        employee_age: age,
      },
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        ToastAndroid.show(
          "Created object at id: " + json.id,
          ToastAndroid.SHORT
        );
      });
  };

  const UpdateUser = (id, name, salary, age) => {
    fetch("https://dummy.restapiexample.com/api/v1/update/" + id, {
      method: "PUT",
      body: {
        employee_name: name,
        employee_salary: salary,
        employee_age: age,
      },
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        ToastAndroid.show("Updated object", ToastAndroid.SHORT);
      });
  };

  const DeleteUser = (id) => {
    fetch("https://dummy.restapiexample.com/api/v1/delete/" + id, {
      method: "DELETE",
    }).then((response) => {
      console.log(response);
      ToastAndroid.show("Deleted object", ToastAndroid.SHORT);
    });
  };

  return (
    <View style={styles.container}>
      {showMethod === null && <Text style={styles.header}>API</Text>}
      {showMethod === "GET" && (
        <View style={styles.methodContainer}>
          <Text style={styles.header}>GET method!</Text>
          <TextInput
            placeholder="ID"
            style={styles.input}
            value={id}
            onChangeText={setID}
          />
          <Button
            title="Fetch"
            style={styles.button}
            onPress={fetchUser(2)}
            color="#6EB4D5"
          />
          <Text>Name: {getName}</Text>
          <Text>Salary: {getSalary}</Text>
          <Text>Age: {getAge}</Text>
        </View>
      )}
      {showMethod === "POST" && (
        <View style={styles.methodContainer}>
          <Text style={styles.header}>POST method!</Text>
          <TextInput
            placeholder="Name"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
          <TextInput
            placeholder="Salary"
            style={styles.input}
            value={salary}
            onChangeText={setSalary}
          />
          <TextInput
            placeholder="Age"
            style={styles.input}
            value={age}
            onChangeText={setAge}
          />

          <Button
            title="Post"
            style={styles.button}
            onPress={AddUser(name, salary, age, id)}
            color="#6EB4D5"
          />
        </View>
      )}

      {showMethod === "PUT" && (
        <View style={styles.methodContainer}>
          <Text style={styles.header}>PUT method!</Text>
          <TextInput
            placeholder="Id"
            style={styles.input}
            value={id}
            onChangeText={setID}
          />
          <TextInput
            placeholder="Name"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
          <TextInput
            placeholder="Salary"
            style={styles.input}
            value={salary}
            onChangeText={setSalary}
          />
          <TextInput
            placeholder="Age"
            style={styles.input}
            value={age}
            onChangeText={setAge}
          />
          <Button
            title="Post"
            style={styles.button}
            onPress={UpdateUser}
            color="#6EB4D5"
          />
        </View>
      )}
      {showMethod === "DELETE" && (
        <View style={styles.methodContainer}>
          <Text style={styles.header}>DELETE method!</Text>
          <TextInput
            placeholder="Id"
            style={styles.input}
            value={id}
            onChangeText={setID}
          />
          <Button
            title="Post"
            style={styles.button}
            onPress={DeleteUser}
            color="#6EB4D5"
          />
        </View>
      )}
      <View style={styles.optionsButton}>
        <Button
          title="GET"
          style={styles.button}
          onPress={() => setShowMethod("GET")}
          color="#6EB4D5"
        />

        <Button
          title="POST"
          style={styles.button}
          onPress={() => setShowMethod("POST")}
          color="#6EB4D5"
        />

        <Button
          title="PUT"
          style={styles.button}
          onPress={() => setShowMethod("PUT")}
          color="#6EB4D5"
        />

        <Button
          title="DELETE"
          style={styles.button}
          onPress={() => setShowMethod("DELETE")}
          color="#6EB4D5"
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#335EA1",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    height: 40,
  },
  input: {
    borderWidth: 2,
    width: 300,
    margin: 10,
    borderStyle: "solid",
    borderColor: "black",
    fontSize: 20,
    padding: 10,
  },

  optionsButton: {
    flexDirection: "row",
    gap: 10,
    position: "absolute",
    bottom: 60,
  },
  methodContainer: {
    position: "absolute",
    top: 70,
  },
});
