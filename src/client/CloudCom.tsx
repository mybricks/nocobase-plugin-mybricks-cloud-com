import React, { useEffect, useState } from 'react';
import { observer, useField } from '@formily/react';
import { useBlockHeight } from '@nocobase/client';
import { theme, ConfigProvider } from 'antd';
// @ts-ignore
import RendererCloud from '@mybricks/renderer-pc-cloud-without-com-defs';
import zhCN from 'antd/lib/locale/zh_CN';
import { BlockName } from '../constants';
import 'dayjs/locale/zh-cn';

const useMyBricksCloudComHeight = () => {
  const { token } = theme.useToken();
  const height = useBlockHeight();
  if (!height) {
    return;
  }
  return height - 2 * token.paddingLG;
};

export const CloudCom = observer(
  () => {
    const height = useMyBricksCloudComHeight();
    const [key, setKey] = useState(null);
    const field = useField();
    const jsonString = field.componentProps?.['data-json'];

    let jsonObject = null;
    try {
      jsonObject = JSON.parse(jsonString);
    } catch (e) {
      jsonObject = null;
    }

    // jsonObject 兼容老版本
    if (jsonObject?.content) {
      jsonObject = jsonObject.content;
    }

    useEffect(() => {
      if (jsonString !== key) {
        setKey(jsonString);
      }
    }, [jsonString, key]);

    return (
      <ConfigProvider locale={zhCN}>
        <div style={{ height: height || '100%', overflowY: height ? 'auto' : undefined }}>
          {!jsonString || !jsonObject?.scenes?.length ? (
            <div>
              未{jsonString ? '正确' : ''}配置 MyBricks 云组件
              <a
                href="https://my.mybricks.world"
                target="_blank"
                rel="noreferrer"
                style={{ fontWeight: 500, marginLeft: 6, marginRight: 6 }}
              >
                点击搭建
              </a>
            </div>
          ) : (
            key && <Render key={key} toJSON={jsonObject} />
          )}
        </div>
      </ConfigProvider>
    );
  },
  { displayName: BlockName },
);

function Render({ toJSON }) {
  return <RendererCloud toJSON={toJSON} />;
}
