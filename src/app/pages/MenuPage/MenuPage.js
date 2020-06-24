import { Colors, Styles } from '../../styles'
import { Icon, Link, Page, SectionList, Text, View } from '../../components'
import { StyleSheet } from 'react-native'
import { buildLocation } from '../../../utils/url'
import { compose } from '../../../utils/lang'
import {
  defaultProps,
  memo,
  setDisplayName,
  withHandlers
} from '../../../utils/react'
import React from 'react'

const enhance = compose(
  setDisplayName('MenuPage'),
  defaultProps({
    sections: [
      {
        data: [
          {
            text: 'Logout',
            to: buildLocation({
              pathname: '/logout'
            })
          }
        ],
        title: 'Account'
      },
      {
        data: [
          {
            text: 'Privacy Policy',
            to: buildLocation({
              pathname: '/legal/privacy',
              state: { back: true }
            })
          },
          {
            text: 'Terms of Service',
            to: buildLocation({
              pathname: '/legal/terms',
              state: { back: true }
            })
          }
        ],
        title: 'Legal'
      }
    ],
    styles: {
      ...Styles,
      ...StyleSheet.create({
        sectionHeader: {
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'row',
          height: 50,
          paddingLeft: 10
        },
        sectionItem: {
          display: 'flex',
          height: 50,
          justifyContent: 'center',
          paddingLeft: 30
        },
        sectionLink: {
          display: 'flex'
        },
        seperator: {
          borderBottomColor: Colors.primaryBlack,
          borderBottomStyle: 'solid',
          borderBottomWidth: 1,
          flex: 1
        },
        textInputStyle: {
          marginBottom: 10,
          marginTop: 10
        },
        viaIcon: {
          marginLeft: 'auto',
          marginRight: 10
        }
      })
    }
  }),
  withHandlers({
    renderItem: ({ styles }) => ({ item }) => (
      <View style={styles.sectionItem}>
        <Link
          style={StyleSheet.flatten([styles.link, styles.sectionLink])}
          to={item.to}
        >
          <Text style={styles.mediumText}>{item.text}</Text>
          <Text style={[styles.icon, styles.viaIcon]}>
            <Icon icon="chevron-right" />
          </Text>
        </Link>
      </View>
    ),
    renderSectionHeader: ({ styles }) => ({ section }) => (
      <View style={styles.sectionHeader}>
        <Text style={styles.mediumText}>{section.title}</Text>
        <View style={styles.seperator} />
      </View>
    )
  }),
  memo
)

const MenuPage = enhance(
  ({ renderItem, renderSectionHeader, sections, styles }) => {
    return (
      <Page description="Menu">
        <View style={styles.block}>
          <SectionList
            keyExtractor={(item, index) => item + index}
            renderItem={renderItem}
            renderSectionHeader={renderSectionHeader}
            sections={sections}
          />
        </View>
      </Page>
    )
  }
)

export default MenuPage
