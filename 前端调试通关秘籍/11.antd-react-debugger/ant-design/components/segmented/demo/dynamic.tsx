import React, { useState } from 'react';
import { Segmented, Button } from 'antd';

const defaultOptions = ['Daily', 'Weekly', 'Monthly'];

const Demo: React.FC = () => {
  const [options, setOptions] = useState(defaultOptions);
  const [moreLoaded, setMoreLoaded] = useState(false);

  const handleLoadOptions = () => {
    setOptions([...defaultOptions, 'Quarterly', 'Yearly']);
    setMoreLoaded(true);
  };

  return (
    <>
      <Segmented options={options} />
      <br />
      <Button type="primary" disabled={moreLoaded} onClick={handleLoadOptions}>
        Load more options
      </Button>
    </>
  );
};

export default Demo;
