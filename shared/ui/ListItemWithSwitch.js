import * as React from 'react'
import { StyleSheet, Switch, Text, View } from 'react-native'
import useThemeStore from '../theme/store/store'
import SwitchTheme from '../theme/SwitchTheme'
import Divider from './Divider'
import TextMain from './Text/TextMain'
import { useState } from 'react'
import Checkbox from 'expo-checkbox'

const ListItemWithSwitch = ({ title, isDividerNeed = false, value = null, onValueChange = false }) => {
  const isTheme = useThemeStore((state) => state.theme)
  return (
    <>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignContent: 'flex-start',
        }}
      >
        <View
          style={{
            backgroundColor: SwitchTheme(isTheme).bgItem,
            borderRadius: 20,
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 16,
            paddingVertical: 16,
          }}
        >
          <View style={styles.rows2}>
            <TextMain>{title}</TextMain>
          </View>
          <Checkbox
            value={value}
            style={{ width: 18, height: 18 }}
            color={onValueChange ? SwitchTheme(isTheme).checkIcon : SwitchTheme(isTheme).checkBox}
            onValueChange={onValueChange}
          />
        </View>
        {isDividerNeed && <Divider ml={0} />}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  rows2: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
})

export default ListItemWithSwitch
