import React from 'react'

export default function Ingredient(props) {
  const { name ,amount} = props;
  return (
    // 这里div去掉，因为div会让我们两个span在一格
    <>
        <span>{name}</span>
        <span>{amount}</span>
    </>
  )
}
