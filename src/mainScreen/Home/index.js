import React from 'react';
import { View, SafeAreaView, StatusBar, ScrollView } from 'react-native';

import Logo from './components/tools/logo/Logo';
import Guide from './components/tools/guide/Guide';
import Clock from './components/tools/clock/Clock';
import Shortcuts from './components/tools/shortcut/Shortcuts';
import Graphic from './components/tools/graphics/Graphics';
import Banner from './components/contribute/Banner';
import Social from './components/tools/social/Social';

import colors from '../../config/colors';
import styles from './style'

export default function Home() {
  return (
    <SafeAreaView>
      <StatusBar barStyle={'dark-content'} backgroundColor={colors.blue} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Logo />
          <Guide />
          <Clock />
          <Shortcuts />
          <Graphic />
          <Banner />
          <Social />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};