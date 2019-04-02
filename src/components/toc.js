import React from 'react'
import styled from 'styled-components'
import {
  Card,
  CardContent,
  Typography,
  CardActionArea,
} from '@material-ui/core'
import scrollIntoView from 'scroll-into-view-if-needed'

const TableContainer = styled.div`
  padding: 0.5rem;
`

const CompactCardContent = styled.div`
  padding: 5px 10px;
`

const TableItem = styled(CardActionArea)`
  &&& {
    padding-left: ${props => (props.level - 1) * 1 + 'rem'};
  }
`

const buildTable = (closeTable, elements) => {
  return Array.from(elements).map((element, index) => {
    const level = +element.tagName[1]
    const variants = ['h5', 'h6', 'subtitle1']
    if (level > 3) return
    return (
      <TableItem
        onClick={() => {
          // closeTable();
          scrollIntoView(element, {
            behavior: 'smooth',
            scrollMode: 'if-needed',
          })
          closeTable();
        }}
        level={+element.tagName[1]}
      >
        <CompactCardContent>
          <Typography variant={variants[level]}>{element.innerText}</Typography>
        </CompactCardContent>
      </TableItem>
    )
  })
}

export default function TableOfContents({ closeTable, headlines }) {
  return (
    <TableContainer>
      <Typography variant="h4">目录</Typography>
      {buildTable(closeTable, headlines)}
    </TableContainer>
  )
}
