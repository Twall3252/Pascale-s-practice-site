import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { ReleaseInfo } from '../utils/api';
import tw from 'twrnc';

interface Props {
  item: ReleaseInfo;
}

export default function FirmwareItem({ item }: Props) {
  const onFlash = () => {
    Alert.alert('Flash', `Pretending to flash ${item.name} ${item.tag}`);
  };

  return (
    <View style={tw`bg-gray-800 p-3 rounded-lg mb-2`}>
      <Text style={tw`text-white font-bold`}>{item.name}</Text>
      <Text style={tw`text-gray-400`}>{item.tag}</Text>
      <Text style={tw`text-gray-500 text-xs`}>{item.published.slice(0,10)}</Text>
      <TouchableOpacity style={tw`mt-2 bg-blue-600 p-2 rounded`} onPress={onFlash}>
        <Text style={tw`text-center text-white`}>Flash</Text>
      </TouchableOpacity>
    </View>
  );
}
