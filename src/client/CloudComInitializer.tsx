import { FormOutlined } from '@ant-design/icons';
import { SchemaInitializerItem, useSchemaInitializer, useSchemaInitializerItem } from '@nocobase/client';
import React from 'react';

export const CloudComInitializer = () => {
  const { insert } = useSchemaInitializer();
  const itemConfig = useSchemaInitializerItem();
  return (
    <SchemaInitializerItem
      {...itemConfig}
      icon={<FormOutlined />}
      onClick={() => {
        insert({
          type: 'void',
          'x-settings': 'blockSettings:cloudcom',
          'x-decorator': 'CardItem',
          'x-decorator-props': {
            name: 'cloudcom',
          },
          'x-component': 'CloudCom',
          'x-component-props': {},
        });
      }}
    />
  );
};
