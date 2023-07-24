import React, { useState } from 'react'
import { Menu } from 'antd'

const items = [
  {
    label: (
      <a href="/subscription">
        Subscription
      </a>
    ),
    key: 'subscription',
  },
]

function LeftMenu(props) {
  const [current, setCurrent] = useState('');
  
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
  )
}

export default LeftMenu