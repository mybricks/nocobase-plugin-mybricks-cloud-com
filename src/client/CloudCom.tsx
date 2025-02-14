import React, { useMemo, useEffect, useState } from 'react';
import { observer, useField } from '@formily/react';
import { BlockName } from '../constants';
// @ts-ignore
import RendererCloud from '@mybricks/renderer-pc-cloud-without-com-defs';

export const CloudCom = observer(
  () => {
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

    if (!jsonString || !jsonObject?.scenes?.length) {
      return (
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
      );
    }

    return key && <Render key={key} toJSON={jsonObject} />;
  },
  { displayName: BlockName },
);

function Render({ toJSON }) {
  return <RendererCloud toJSON={toJSON} />
}
