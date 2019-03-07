import React from 'react'
import styled from 'styled-components'
import {
  Card,
  CardContent,
  Typography,
  CardActionArea,
} from '@material-ui/core'

const TableContainer = styled(Card)`
  position: fixed;
  padding: 0.5rem;
  top: ${props => (props.sticky ? '140px' : '1000px')};
  right: 200px;
  max-width: 300px;
  max-height: 80vh;
  &&& {
    overflow-y: auto;
  }
`

const CompactCardContent = styled(CardContent)`
  &&& {
    padding: 5px 10px;
  }
`

const TableItem = styled(CardActionArea)`
  &&& {
    padding-left: ${props => (props.level - 1) * 1 + 'rem'};
  }
`

const buildTable = elements => {
  return Array.from(elements).map((element, index) => {
    const level = +element.tagName[1]
    const variants = ['h5', 'h6', 'subtitle1']
    if (level > 3) return
    return (
      <TableItem onClick={() => element.scrollIntoView({behavior: 'smooth'})} level={+element.tagName[1]}>
        <CompactCardContent>
          <Typography variant={variants[level]}>{element.innerText}</Typography>
        </CompactCardContent>
      </TableItem>
    )
  })
}

export default function TableOfContents({ sticky, headlines }) {
  return (
    <TableContainer sticky={sticky}>
      <Typography variant="h4">目录</Typography>
      {buildTable(headlines)}
    </TableContainer>
  )
}
