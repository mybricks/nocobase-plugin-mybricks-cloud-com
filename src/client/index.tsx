import { Plugin } from '@nocobase/client';

import { cloudComSchemaSettings } from './schemaSettings';
import { CloudComProvider } from './CloudComProvider';

export class CloudComClient extends Plugin {
  async afterAdd() {
    // await this.app.pm.add()
  }

  async beforeLoad() {}

  // You can get and modify the app instance here
  async load() {
    this.app.schemaSettingsManager.add(cloudComSchemaSettings);
    // 注册云区块
    this.app.use(CloudComProvider);

    const blockInitializers = this.app.schemaInitializerManager.get('page:addBlock');
    blockInitializers?.add('otherBlocks.cloudcom', {
      title: 'MyBricks云组件',
      Component: 'CloudComInitializer',
    });

    const createFormBlockInitializers = this.app.schemaInitializerManager.get('popup:addNew:addBlock');
    createFormBlockInitializers?.add('otherBlocks.cloudcom', {
      title: 'MyBricks云组件',
      Component: 'CloudComInitializer',
    });

    const recordBlockInitializers = this.app.schemaInitializerManager.get('popup:common:addBlock');
    recordBlockInitializers?.add('otherBlocks.cloudcom', {
      title: 'MyBricks云组件',
      Component: 'CloudComInitializer',
    });

    const recordFormBlockInitializers = this.app.schemaInitializerManager.get('RecordFormBlockInitializers');
    recordFormBlockInitializers?.add('otherBlocks.cloudcom', {
      title: 'MyBricks云组件',
      Component: 'CloudComInitializer',
    });

    this.app.schemaInitializerManager.addItem('mobilePage:addBlock', 'otherBlocks.cloudcom', {
      title: 'MyBricks云组件',
      Component: 'CloudComInitializer',
    });

    this.app.schemaInitializerManager.addItem('mobile:addBlock', 'otherBlocks.cloudcom', {
      title: 'MyBricks云组件',
      Component: 'CloudComInitializer',
    });
  }
}

export default CloudComClient;
