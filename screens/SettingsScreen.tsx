import { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { addUserRepo, listUserRepos, RepoRef } from '../utils/api';
import tw from 'twrnc';

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const [owner, setOwner] = useState('');
  const [repo, setRepo] = useState('');
  const [repos, setRepos] = useState<RepoRef[]>([]);

  const refresh = () => {
    listUserRepos().then((r) => setRepos(r));
  };

  useEffect(() => {
    refresh();
  }, []);

  const onAdd = () => {
    if (!owner || !repo) {
      Alert.alert('Error', 'Both owner and repository are required');
      return;
    }
    addUserRepo(owner.trim(), repo.trim())
      .then(() => {
        setOwner('');
        setRepo('');
        refresh();
      })
      .catch(() => Alert.alert('Error', 'Failed to save repository'));
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={tw`flex-1`}>
      <View style={[tw`flex-1 bg-gray-900 p-4`, { paddingTop: insets.top }]}> 
        <Text style={tw`text-white text-lg mb-2`}>Custom Repositories</Text>
        <FlatList
          data={repos}
          keyExtractor={(item) => `${item.owner}/${item.repo}`}
          renderItem={({ item }) => (
            <Text style={tw`text-gray-300`}>
              {item.owner}/{item.repo}
            </Text>
          )}
          ListEmptyComponent={<Text style={tw`text-gray-500`}>No custom repositories yet.</Text>}
          style={tw`mb-4`}
        />

        <TextInput
          placeholder="Owner"
          placeholderTextColor="#9CA3AF"
          value={owner}
          onChangeText={setOwner}
          style={tw`border border-gray-700 rounded p-2 text-white mb-2`}
        />
        <TextInput
          placeholder="Repository"
          placeholderTextColor="#9CA3AF"
          value={repo}
          onChangeText={setRepo}
          style={tw`border border-gray-700 rounded p-2 text-white mb-4`}
        />
        <TouchableOpacity style={tw`bg-blue-600 p-3 rounded`} onPress={onAdd}>
          <Text style={tw`text-center text-white`}>Add Repository</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
