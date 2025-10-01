import { useState } from 'react';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import FirmwareScreen from './screens/FirmwareScreen';
import AppsScreen from './screens/AppsScreen';
import SettingsScreen from './screens/SettingsScreen';
import TabBar from './components/TabBar';
import tw from 'twrnc';

export default function App() {
  const [tab, setTab] = useState<'firmwares' | 'apps' | 'settings'>('firmwares');
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={[tw`flex-1 bg-gray-900`, { paddingTop: insets.top }]}> 
      {tab === 'firmwares' && <FirmwareScreen />}
      {tab === 'apps' && <AppsScreen />}
      {tab === 'settings' && <SettingsScreen />}
      <TabBar current={tab} onChange={setTab} />
    </SafeAreaView>
  );
}
