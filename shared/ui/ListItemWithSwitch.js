import * as React from 'react'
import { StyleSheet, Switch, Text, View } from 'react-native'
import useThemeStore from '../theme/store/store'
import SwitchTheme from '../theme/SwitchTheme'
import Divider from './Divider'
import TextMain from './Text/TextMain'
import { useState } from 'react'
import Checkbox from 'expo-checkbox'

const ListItemWithSwitch = ({
  title,
  isDividerNeed = false,
  value = null,
  onValueChange = false,
  isSwitch = false,
}) => {
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
            paddingLeft: 16,
            paddingRight: 27,
            paddingVertical: 16,
          }}
        >
          <View style={styles.rows2}>
            <TextMain>{title}</TextMain>
          </View>
          {isSwitch ? (
            <Switch
              alignSelf="center"
              onValueChange={onValueChange}
              value={value}
              thumbColor={!isTheme.includes('_usual') && SwitchTheme(isTheme).checkIcon}
              trackColor={{
                true: !isTheme.includes('_usual') && SwitchTheme(isTheme.replace('_dark', '')).textOuterSec,
              }}
              style={{ height: 18, marginRight: -14.4 }}
            />
          ) : (
            <Checkbox
              value={value}
              style={{ width: 18, height: 18 }}
              color={value ? SwitchTheme(isTheme).checkIcon : SwitchTheme(isTheme).checkBox}
              onValueChange={onValueChange}
            />
          )}
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
