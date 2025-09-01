import { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert } from 'react-native';
import FirmwareItem from '../components/FirmwareItem';
import { fetchFirmwareReleases, ReleaseInfo } from '../utils/api';
import tw from 'twrnc';

export default function FirmwareScreen() {
  const [data, setData] = useState<ReleaseInfo[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    fetchFirmwareReleases()
      .then((list) => {
        setData(list);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        Alert.alert('Error', 'Failed to fetch firmware list');
      });
  };

  useEffect(() => {
    load();
    const interval = setInterval(() => load(), 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <ActivityIndicator style={tw`m-4`} />;

  if (data.length === 0)
    return (
      <View style={tw`flex-1 items-center justify-center`}>
        <Text style={tw`text-gray-400`}>No releases found.</Text>
      </View>
    );

  return (
    <View style={tw`flex-1 p-2`}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.url}
        renderItem={({ item }) => <FirmwareItem item={item} />}
      />
    </View>
  );
}
