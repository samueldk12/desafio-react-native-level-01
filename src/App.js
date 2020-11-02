import React, { useState, useEffect } from "react";
import api from './services/api';
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function App() {
  const [ projects, setProjects ] = useState([]);

  useEffect(()=>{
    api.get('repositories').then(response => {
        setProjects(response.data);
    });
  },[])
  async function handleLikeRepository(id) {
    const response = await api.post(`repositories/${id}`);
    
    let project = response.data;

    setProjects([...projects,project]); 
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList
          style={styles.repositoryContainer}
          data={projects}
          keyExtractor={project => project.id}
          renderItem={({ item : project })=>{
            <>
              <Text style={styles.tech} key={project.id}>{project.title}</Text>
              <View style={styles.likesContainer}>
                <Text
                  style={styles.likeText}
                  testID={project.id}
                >
                  {project.likes}
                </Text>
              </View>    
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleLikeRepository(project.id)}
                testID={project.id}
              >
              <Text style={styles.buttonText}>Curtir</Text>
              </TouchableOpacity>
            </>
          }}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
