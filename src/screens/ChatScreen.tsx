import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { CatBreed } from '../types/cat';

interface Message {
  id: string;
  text: string;
  isFromCat: boolean;
  timestamp: string;
}

interface ChatScreenProps {
  cat: CatBreed;
  onBack: () => void;
}

export default function ChatScreen({ cat, onBack }: ChatScreenProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Hi! I'm ${cat.name}! Nice to meet you! 😸`,
      isFromCat: true,
      timestamp: '10:30',
    },
    {
      id: '2',
      text: `I'm from ${cat.origin}. Do you want to be friends? 🐾`,
      isFromCat: true,
      timestamp: '10:31',
    },
  ]);
  const [inputText, setInputText] = useState('');

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[
      styles.messageContainer,
      item.isFromCat ? styles.catMessage : styles.userMessage
    ]}>
      <Text style={[
        styles.messageText,
        item.isFromCat ? styles.catMessageText : styles.userMessageText
      ]}>
        {item.text}
      </Text>
      <Text style={styles.timestamp}>{item.timestamp}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => {
            console.log('🔙 Back button pressed in ChatScreen');
            onBack();
          }} 
          style={styles.backButton}
        >
          <MaterialIcons name="arrow-back" size={24} color="#434141" />
        </TouchableOpacity>
        
        <View style={styles.catInfo}>
          <Image 
            source={{ uri: `https://api.thecatapi.com/v1/images/${cat.id}` }} 
            style={styles.catAvatar}
          />
          <View style={styles.catDetails}>
            <Text style={styles.catName}>{cat.name}</Text>
            <Text style={styles.catOrigin}>{cat.origin}</Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.moreButton}>
          <MaterialIcons name="more-vert" size={24} color="#434141" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        style={styles.messagesList}
        contentContainerStyle={styles.messagesContainer}
      />

      {/* Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type a message..."
          placeholderTextColor="#BFBFC0"
          multiline
        />
        <TouchableOpacity 
          style={styles.sendButton}
          disabled={!inputText.trim()}
        >
          <MaterialIcons 
            name="send" 
            size={24} 
            color={inputText.trim() ? "#FF6B6B" : "#BFBFC0"} 
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  backButton: {
    marginRight: 15,
  },
  catInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  catAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  catDetails: {
    flex: 1,
  },
  catName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#434141',
  },
  catOrigin: {
    fontSize: 12,
    color: '#BFBFC0',
  },
  moreButton: {
    marginLeft: 15,
  },
  messagesList: {
    flex: 1,
  },
  messagesContainer: {
    padding: 20,
  },
  messageContainer: {
    maxWidth: '80%',
    marginBottom: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
  },
  catMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 5,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#FF6B6B',
    borderTopRightRadius: 5,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  catMessageText: {
    color: '#434141',
  },
  userMessageText: {
    color: '#FFFFFF',
  },
  timestamp: {
    fontSize: 12,
    color: '#BFBFC0',
    marginTop: 5,
    textAlign: 'right',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    maxHeight: 100,
    fontSize: 16,
    color: '#434141',
  },
  sendButton: {
    padding: 10,
  },
});
