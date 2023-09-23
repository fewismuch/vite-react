import React from 'react'
import { GithubFilled, InfoCircleFilled, QuestionCircleFilled } from '@ant-design/icons'
import type { ProSettings } from '@ant-design/pro-components'
import { ProConfigProvider, ProLayout } from '@ant-design/pro-components'
import defaultProps from './_defaultProps'
import { AvatarButton } from '@/layout/Avatar'
import { MenuSearchInput } from '@/layout/MenuSearchInput'
import { MultiTabs } from '../MultiTabs'
import { KeepAlive, AliveScope, useAliveController } from 'react-activation'
import { useLocation } from 'react-router-dom'

interface Props {
  children?: React.ReactNode
}

const settings: Partial<ProSettings> = {
  fixSiderbar: true,
  layout: 'mix',
  footerRender: false,
  fixedHeader: true
}

export const CustomLayout = (props: Props) => {
  const { children } = props
  let location = useLocation()
  return (
    <div className='h-[100vh]'>
      <ProConfigProvider dark={false}>
        <ProLayout
          {...defaultProps}
          route={{
            path: '/',
            routes: {}
          }}
          location={{
            pathname: location.pathname
          }}
          menu={{
            type: undefined
          }}
          actionsRender={props => {
            if (props.isMobile) return []
            return [
              props.layout !== 'side' && document.body.clientWidth > 1400 ? (
                <MenuSearchInput />
              ) : undefined,
              <InfoCircleFilled key='InfoCircleFilled' />,
              <QuestionCircleFilled key='QuestionCircleFilled' />,
              <GithubFilled key='GithubFilled' />,
              <AvatarButton />
            ]
          }}
          menuFooterRender={props => {
            return props?.collapsed ? null : <MenuFooter />
          }}
          onMenuHeaderClick={e => console.log(e)}
          menuItemRender={(item, dom) => (
            <a
              onClick={() => {
                //setPathname(item.path || '/')
                //navigate(item.path||'/')
                // 向multiTabs中添加记录
                //addTab(item.path || '/')
                console.log(item)
              }}
            >
              {dom}
            </a>
          )}
          {...settings}
        >
          <MultiTabs />

          <AliveScope>
            <KeepAlive
              when={true}
              name={location.pathname}
              id={location.pathname}
              saveScrollPosition='screen'
            >
              {children}
            </KeepAlive>
          </AliveScope>
        </ProLayout>
      </ProConfigProvider>
    </div>
  )
}

const MenuFooter = () => (
  <div
    style={{
      textAlign: 'center',
      paddingBlockStart: 12
    }}
  >
    <div>© 2023 Made with love</div>
    <div>by Ant Design</div>
  </div>
)
