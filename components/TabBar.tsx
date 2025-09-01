import { View, TouchableOpacity, Text } from 'react-native';
import tw from 'twrnc';

interface Props {
  current: 'firmwares' | 'apps' | 'settings';
  onChange: (tab: 'firmwares' | 'apps' | 'settings') => void;
}

export default function TabBar({ current, onChange }: Props) {
  return (
    <View style={tw`flex-row bg-gray-800`}>
      <Tab label="Firmwares" id="firmwares" current={current} onChange={onChange} />
      <Tab label="Apps" id="apps" current={current} onChange={onChange} />
      <Tab label="Settings" id="settings" current={current} onChange={onChange} />
    </View>
  );
}

interface TabProps {
  label: string;
  id: 'firmwares' | 'apps' | 'settings';
  current: string;
  onChange: Props['onChange'];
}

function Tab({ label, id, current, onChange }: TabProps) {
  return (
    <TouchableOpacity style={tw`flex-1 p-3`} onPress={() => onChange(id)}>
      <Text style={tw`${current === id ? 'text-blue-400' : 'text-gray-400'} text-center`}>{label}</Text>
    </TouchableOpacity>
  );
}
