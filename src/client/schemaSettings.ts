import { ISchema, useField, useFieldSchema } from '@formily/react';
import { uid } from '@formily/shared';
import { SchemaSettings, useAPIClient, useDesignable } from '@nocobase/client';
import { BlockName } from '../constants';

export const cloudComSchemaSettings = new SchemaSettings({
  name: `blockSettings:cloudcom`,
  items: [
    {
      name: '编辑云组件',
      type: 'modal',
      useComponentProps() {
        const field = useField();
        const fieldSchema = useFieldSchema();
        const { dn } = useDesignable();

        return {
          title: '设置云组件',
          asyncGetInitialValues: async () => {
            const json = field.componentProps?.['data-json'] ? JSON.parse(field.componentProps?.['data-json']) : null;
            return {
              json: json,
            };
          },
          schema: {
            type: 'object',
            properties: {
              json: {
                type: 'json',
                title: 'json',
                'x-component': 'Input.JSON',
                'x-component-props': {
                  rows: 20,
                },
              },
              description: {
                type: 'void',
                'x-component': 'p',
                'x-content': '可使用快捷键 ctrl / command + A 快速全选，然后将 JSON 粘贴到此处',
                'x-component-props': {
                  style: {
                    marginTop: 6,
                    color: '#999',
                  },
                },
              },
            },
          },
          onSubmit: async ({ json }) => {
            const componentProps = fieldSchema['x-component-props'] || {};
            componentProps['data-json'] = JSON.stringify(json);

            fieldSchema['x-component-props'] = componentProps;
            field.componentProps = { ...componentProps };
            field.data = { v: uid() };
            dn.emit('patch', {
              schema: {
                'x-uid': fieldSchema['x-uid'],
                'x-component-props': componentProps,
              },
            });
          },
          noRecord: true,
        };
      },
    },
    {
      name: 'divider',
      type: 'divider',
    },
    {
      name: 'delete',
      type: 'remove',
      useComponentProps() {
        return {
          removeParentsIfNoChildren: true,
          breakRemoveOn: {
            'x-component': 'Grid',
          },
        };
      },
    },
  ],
});
