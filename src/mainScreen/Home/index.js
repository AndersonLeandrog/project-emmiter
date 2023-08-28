import React from 'react';
import { View, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import styles from './style'

// Import dos módulos da página inicial do app
import LogoWidget from './components/tools/LogoWidget';
import ClockWidget from './components/tools/ClockWidget';
import Shortcuts from './components/tools/Shortcuts';
import GraphWidget from './components/tools/GraphWidget';
import Banner from './components/contribute/Banner';
import Social from './components/tools/SocialWidget';

export default function Home() {
  return (
    <SafeAreaView>
      <StatusBar barStyle={'dark-content'} backgroundColor='#29EF60' />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <LogoWidget />
          <ClockWidget />
          <Shortcuts />
          <GraphWidget />
          <Banner />
          <Social />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};