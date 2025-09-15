// File: src/screens/AI/AIAssistant.js (NEW)
import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  TextInput,
  Button,
  Text,
  Card,
  Title,
  Paragraph,
  ActivityIndicator,
  Chip,
  Divider,
} from 'react-native-paper';
import { aiService } from '../../services/aiService';

export default function AIAssistant() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState('BUSINESS_INSIGHTS');

  const aiTypes = [
    { key: 'BUSINESS_INSIGHTS', label: 'Business Insights', icon: 'lightbulb' },
    { key: 'EMAIL_GENERATOR', label: 'Email Writer', icon: 'email' },
    { key: 'MARKETING_POST', label: 'Marketing Post', icon: 'bullhorn' },
  ];

  const quickQuestions = [
    'What are my top selling products?',
    'How much profit did I make today?',
    'Show me my inventory status',
    'Which customers bought the most?',
    'What are my monthly expenses?',
  ];

  const handleSendQuery = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setResponse('');

    try {
      let result;
      
      switch (selectedType) {
        case 'BUSINESS_INSIGHTS':
          result = await aiService.generateInsights(query);
          setResponse(result.answer);
          break;
        case 'EMAIL_GENERATOR':
          result = await aiService.generateEmail('GENERAL', query);
          setResponse(`Subject: ${result.subject}\n\n${result.body}`);
          break;
        case 'MARKETING_POST':
          result = await aiService.generateMarketingPost(query, 'promotion');
          setResponse(result.post);
          break;
        default:
          result = await aiService.processAIRequest(selectedType, query);
          setResponse(result.response);
      }
    } catch (error) {
      setResponse('Sorry, I encountered an error. Please try again.');
      console.error('AI Service Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickQuestion = (question) => {
    setQuery(question);
    setSelectedType('BUSINESS_INSIGHTS');
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Title style={styles.title}>AI Business Assistant</Title>
          <Paragraph style={styles.subtitle}>
            Ask me anything about your business
          </Paragraph>

          {/* AI Type Selection */}
          <Card style={styles.typeCard}>
            <Card.Content>
              <Text style={styles.sectionTitle}>Select AI Service</Text>
              <View style={styles.typeContainer}>
                {aiTypes.map((type) => (
                  <Chip
                    key={type.key}
                    selected={selectedType === type.key}
                    onPress={() => setSelectedType(type.key)}
                    icon={type.icon}
                    style={styles.typeChip}
                    mode={selectedType === type.key ? 'flat' : 'outlined'}
                  >
                    {type.label}
                  </Chip>
                ))}
              </View>
            </Card.Content>
          </Card>

          {/* Quick Questions */}
          <Card style={styles.quickCard}>
            <Card.Content>
              <Text style={styles.sectionTitle}>Quick Questions</Text>
              <View style={styles.quickContainer}>
                {quickQuestions.map((question, index) => (
                  <Chip
                    key={index}
                    onPress={() => handleQuickQuestion(question)}
                    style={styles.quickChip}
                    mode="outlined"
                  >
                    {question}
                  </Chip>
                ))}
              </View>
            </Card.Content>
          </Card>

          {/* Query Input */}
          <Card style={styles.inputCard}>
            <Card.Content>
              <TextInput
                label="Ask your question..."
                value={query}
                onChangeText={setQuery}
                mode="outlined"
                multiline
                numberOfLines={3}
                disabled={loading}
                style={styles.input}
              />
              
              <Button
                mode="contained"
                onPress={handleSendQuery}
                loading={loading}
                disabled={loading || !query.trim()}
                style={styles.sendButton}
                icon="send"
              >
                {loading ? 'Processing...' : 'Ask AI'}
              </Button>
            </Card.Content>
          </Card>

          {/* Response */}
          {(response || loading) && (
            <Card style={styles.responseCard}>
              <Card.Content>
                <Text style={styles.sectionTitle}>AI Response</Text>
                <Divider style={styles.divider} />
                
                {loading ? (
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" />
                    <Text style={styles.loadingText}>
                      AI is thinking...
                    </Text>
                  </View>
                ) : (
                  <Text style={styles.responseText}>{response}</Text>
                )}
              </Card.Content>
            </Card>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6200ee',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  typeCard: {
    marginBottom: 16,
    elevation: 2,
  },
  quickCard: {
    marginBottom: 16,
    elevation: 2,
  },
  inputCard: {
    marginBottom: 16,
    elevation: 2,
  },
  responseCard: {
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: '#6200ee',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  typeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  typeChip: {
    marginRight: 8,
    marginBottom: 8,
  },
  quickContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  quickChip: {
    marginRight: 8,
    marginBottom: 8,
  },
  input: {
    marginBottom: 16,
  },
  sendButton: {
    alignSelf: 'flex-end',
  },
  divider: {
    marginBottom: 16,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  loadingText: {
    marginTop: 12,
    color: '#666',
  },
  responseText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
  },
});
