import React, { FunctionComponent } from 'react'
import { ContentWrapper } from 'vtex.my-account-commons'

const ExamplePage: FunctionComponent<Props> = ({
  match: {
    params: { param },
  },
}) => {
  return (
    <ContentWrapper titleId="My ko" namespace="custom-page">
      {() => <div>My koas: {param}</div>}
    </ContentWrapper>
  )
}

type Props = {
  match: {
    params: {
      param: string
    }
  }
}

export default ExamplePage
