import React from 'react';
import { Anchor } from 'antd';

const { Link } = Anchor;

const getCurrentAnchor = () => '#components-anchor-demo-static';

const App: React.FC = () => (
  <Anchor affix={false} getCurrentAnchor={getCurrentAnchor}>
    <Link href="#components-anchor-demo-basic" title="Basic demo" />
    <Link href="#components-anchor-demo-static" title="Static demo" />
    <Link href="#api" title="API">
      <Link href="#anchor-props" title="Anchor Props" />
      <Link href="#link-props" title="Link Props" />
    </Link>
  </Anchor>
);

export default App;
