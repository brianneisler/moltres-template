import { Colors, Styles } from '../../styles'
import {
  Fragment,
  Icon,
  Link,
  MetaTags,
  SectionList,
  Text,
  View
} from '../../components'
import { StyleSheet } from 'react-native'
import { buildLocation } from '../../../utils/url'
import { compose } from '../../../utils/data'
import {
  connect,
  defaultProps,
  setDisplayName,
  withHandlers,
  withProps
} from '../../../utils/react'
import { selectAppConfig } from '../../modules/app'
import { selectFacebookConfig } from '../../modules/facebook'
import { selectSSRConfig } from '../../../core'
import { selectTwitterConfig } from '../../modules/twitter'
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
  connect((state) => ({
    app: selectAppConfig(state),
    facebook: selectFacebookConfig(state),
    ssr: selectSSRConfig(state),
    twitter: selectTwitterConfig(state)
  })),
  withProps(({ app }) => {
    const description = 'Menu'
    return {
      description,
      title: `${description} - ${app.name}`
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
  })
)

const MenuPage = enhance(
  ({
    app,
    description,
    facebook,
    renderItem,
    renderSectionHeader,
    sections,
    ssr,
    styles,
    title,
    twitter
  }) => {
    return (
      <View style={styles.page}>
        <MetaTags>
          <title>{title}</title>
          {ssr ? (
            <Fragment>
              <meta
                content={description}
                name="description"
                property="description"
              />
              <meta content={description} property="og:description" />
              <meta content={app.name} property="og:site_name" />
              <meta content={title} property="og:title" />
              <meta content="website" property="og:type" />
              <meta content={`${app.url}`} property="og:url" />
              <meta content={facebook.appId} property="fb:app_id" />
              <meta content={twitter.username} property="twitter:site" />
              <meta content={description} property="twitter:image:alt" />
            </Fragment>
          ) : null}
        </MetaTags>
        <View style={styles.block}>
          <SectionList
            keyExtractor={(item, index) => item + index}
            renderItem={renderItem}
            renderSectionHeader={renderSectionHeader}
            sections={sections}
          />
        </View>
      </View>
    )
  }
)

export default MenuPage
