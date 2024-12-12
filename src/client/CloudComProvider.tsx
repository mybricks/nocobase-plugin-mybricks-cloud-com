import { SchemaComponentOptions } from '@nocobase/client';
import React from 'react';
import { ArrayItems } from '@formily/antd-v5';

import { CloudCom } from './CloudCom';
import { CloudComInitializer } from './CloudComInitializer';

export const CloudComProvider = (props: any) => {
  return (
    <SchemaComponentOptions components={{ CloudCom, CloudComInitializer, ArrayItems }}>
      {props.children}
    </SchemaComponentOptions>
  );
};
